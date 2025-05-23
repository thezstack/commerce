'use client';
import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import logo from 'media/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { updateCartNotes } from './actions';
import CloseCart from './close-cart';
import { DeleteItemButton } from './delete-item-button';
import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';
type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart }: { cart: Cart | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const [childNames, setChildNames] = useState<{ [key: string]: string[] }>({});
  const [isCheckoutDisabled, setIsCheckoutDisabled] = useState(false);
  const [localCart, setLocalCart] = useState(cart);
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);
  
  // Handle page visibility changes to ensure clean state when returning from checkout
  useEffect(() => {    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When returning to the page, ensure cart modal is closed
        setIsOpen(false);
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (localCart?.totalQuantity !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = localCart?.totalQuantity;
    }
  }, [isOpen, localCart?.totalQuantity]);

  useEffect(() => {
    const loadChildNames = () => {
      try {
        const storedNames = localStorage.getItem('childNames');
        return storedNames ? JSON.parse(storedNames) : {};
      } catch (error) {
        console.error('Error loading child names from local storage:', error);
        return {};
      }
    };

    const storedNames = loadChildNames();
    const updatedChildNames = { ...storedNames };

    Object.keys(updatedChildNames).forEach((id) => {
      const cartItem = localCart?.lines.find((line) => line.id === id);
      if (!cartItem) {
        delete updatedChildNames[id];
      } else if (updatedChildNames[id].length !== cartItem.quantity) {
        updatedChildNames[id] = updatedChildNames[id].slice(0, cartItem.quantity);
        while (updatedChildNames[id].length < cartItem.quantity) {
          updatedChildNames[id].push('');
        }
      }
    });

    localCart?.lines.forEach((item) => {
      if (!updatedChildNames[item.id]) {
        updatedChildNames[item.id] = Array(item.quantity).fill('');
      }
    });

    setChildNames(updatedChildNames);
    try {
      localStorage.setItem('childNames', JSON.stringify(updatedChildNames));
    } catch (error) {
      console.error('Error saving child names to local storage:', error);
    }

     validateChildNames(updatedChildNames);
  }, [localCart?.lines]);

  const handleChildNameChange = (lineId: string, index: number, value: string) => {
    setChildNames((prev) => {
      const newNames = [...(prev[lineId] ?? [])];
      newNames[index] = value;
      const updatedChildNames = {
        ...prev,
        [lineId]: newNames
      };
      try {
        localStorage.setItem('childNames', JSON.stringify(updatedChildNames));
      } catch (error) {
        console.error('Error saving child names to local storage:', error);
      }
      validateChildNames(updatedChildNames);
      return updatedChildNames;
    });
  };

  const validateChildNames = (names: { [key: string]: string[] }) => {
    const isValid = Object.values(names).every((nameArray) => 
      nameArray.length > 0 && nameArray.every((name) => name.trim() !== '')
    );
    setIsCheckoutDisabled(!isValid);
  };

  const prepareShopifyNotes = () => {
    const notes = localCart?.lines
      .map((item) => {
        const names = childNames[item.id]?.filter((name) => name.trim() !== '');
        if (names && names.length > 0) {
          return {
            productId: item.merchandise.product.id,
            variantId: item.merchandise.id,
            productTitle: item.merchandise.product.title,
            names: names
          };
        }
        return null;
      })
      .filter((note): note is NonNullable<typeof note> => note !== null);
    return JSON.stringify(notes);
  };

  // Store child names in localStorage as soon as they're entered
  useEffect(() => {
    if (Object.keys(childNames).length > 0) {
      try {
        localStorage.setItem('childNames', JSON.stringify(childNames));
      } catch (error) {
        console.error('Error saving child names to local storage:', error);
      }
    }
  }, [childNames]);

  // Save notes to cart when child names change and are valid
  useEffect(() => {
    const saveNotesToCart = async () => {
      // Only save if we have a cart and child names
      if (localCart && Object.keys(childNames).length > 0) {
        try {
          const notes = prepareShopifyNotes();
          
          // Use the API endpoint instead of server action
          const response = await fetch('/api/cart/notes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notes }),
          });
          
          if (!response.ok) {
            throw new Error('Failed to update cart notes');
          }
          
          // We don't need to do anything with the result here
          // Just silently update the notes in the background
        } catch (error) {
          // Just log the error, don't alert the user
          console.error('Background cart notes update failed:', error);
        }
      }
    };

    // Use a debounce to avoid too many requests
    const timeoutId = setTimeout(saveNotesToCart, 1000);
    return () => clearTimeout(timeoutId);
  }, [childNames, localCart]);

  const updateNotesBeforeCheckout = async () => {
    if (isCheckoutDisabled) {
      alert('Please enter names for all children before proceeding to checkout.');
      return false;
    }
    
    setIsSavingNotes(true);
    
    try {
      const notes = prepareShopifyNotes();
      const result = await updateCartNotes(notes);
      
      if (result.error) {
        console.error('Error updating cart notes:', result.error);
        alert('There was an error updating your cart. Please try again.');
        setIsSavingNotes(false);
        return false;
      }
      
      setIsSavingNotes(false);
      return true;
    } catch (error) {
      console.error('Failed to update notes before checkout:', error);
      setIsSavingNotes(false);
      return false;
    }
  };

  // This function handles the checkout button click
  const handleCheckout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (isCheckoutDisabled) {
      alert('Please enter names for all children before proceeding to checkout.');
      return;
    }
    
    // Simply close the cart modal and navigate to the checkout URL
    // The cart notes have already been saved in the background
    setIsOpen(false);
    
    if (localCart?.checkoutUrl) {
      // For Safari compatibility, use a simple window.location.href
      window.location.href = localCart.checkoutUrl;
    }
  };

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={localCart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>
                {!localCart || localCart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {localCart.lines.map((item, i) => {
                      const merchandiseSearchParams = {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(({ name, value }) => {
                        if (value !== DEFAULT_OPTION) {
                          merchandiseSearchParams[name.toLowerCase()] = value;
                        }
                      });

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage?.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage?.url || logo}
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.merchandise.title}
                                  </p>
                                ) : null}
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={item.cost.totalAmount.amount}
                                currencyCode={item.cost.totalAmount.currencyCode}
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton item={item} type="minus" />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                <EditItemQuantityButton item={item} type="plus" />
                              </div>
                            </div>
                          </div>
                          <div className="px-1 pb-4">
                            {Array.from({ length: item.quantity }).map((_, index) => (
                              <input
                                key={`${item.id}-${index}`}
                                type="text"
                                value={childNames[item.id]?.[index] || ''}
                                onChange={(e) => handleChildNameChange(item.id, index, e.target.value)}
                                placeholder={`Child ${index + 1}'s name`}
                                className="mt-2 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-black dark:text-white dark:placeholder-neutral-400"
                                autoComplete="off"
                                inputMode="text"
                                spellCheck="false"
                                style={{ fontSize: '16px' }} /* Prevents iOS zoom */
                              />
                            ))}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={localCart.cost.totalTaxAmount.amount}
                        currencyCode={localCart.cost.totalTaxAmount.currencyCode}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Free to School</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={localCart.cost.totalAmount.amount}
                        currencyCode={localCart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className={`block w-full rounded-full p-3 text-center text-sm font-medium text-white ${
                      isCheckoutDisabled || isSavingNotes
                        ? 'cursor-not-allowed bg-gray-400'
                        : 'bg-blue-600 opacity-90 hover:opacity-100'
                    }`}
                    onClick={handleCheckout}
                    disabled={isCheckoutDisabled || isSavingNotes}
                    aria-label="Proceed to checkout"
                  >
                    {isCheckoutDisabled
                      ? 'Please Enter All Child Names'
                      : isSavingNotes
                        ? 'Saving...' 
                        : 'Proceed to Checkout'}
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}