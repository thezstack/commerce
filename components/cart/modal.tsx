 'use client';

// import { Dialog, Transition } from '@headlessui/react';
// import { ShoppingCartIcon } from '@heroicons/react/24/outline';
// import Price from 'components/price';
// import { DEFAULT_OPTION } from 'lib/constants';
// import type { Cart } from 'lib/shopify/types';
// import { createUrl } from 'lib/utils';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Fragment, useEffect, useRef, useState } from 'react';
// import CloseCart from './close-cart';
// import { DeleteItemButton } from './delete-item-button';
// import { EditItemQuantityButton } from './edit-item-quantity-button';
// import OpenCart from './open-cart';

// type MerchandiseSearchParams = {
//   [key: string]: string;
// };

// export default function CartModal({ cart }: { cart: Cart | undefined }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const quantityRef = useRef(cart?.totalQuantity);
//   const openCart = () => setIsOpen(true);
//   const closeCart = () => setIsOpen(false);

//   useEffect(() => {
//     // Open cart modal when quantity changes.
//     if (cart?.totalQuantity !== quantityRef.current) {
//       // But only if it's not already open (quantity also changes when editing items in cart).
//       if (!isOpen) {
//         setIsOpen(true);
//       }

//       // Always update the quantity reference
//       quantityRef.current = cart?.totalQuantity;
//     }
//   }, [isOpen, cart?.totalQuantity, quantityRef]);

//   return (
//     <>
//       <button aria-label="Open cart" onClick={openCart}>
//         <OpenCart quantity={cart?.totalQuantity} />
//       </button>
//       <Transition show={isOpen}>
//         <Dialog onClose={closeCart} className="relative z-50">
//           <Transition.Child
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="opacity-0 backdrop-blur-none"
//             enterTo="opacity-100 backdrop-blur-[.5px]"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="opacity-100 backdrop-blur-[.5px]"
//             leaveTo="opacity-0 backdrop-blur-none"
//           >
//             <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//           </Transition.Child>
//           <Transition.Child
//             as={Fragment}
//             enter="transition-all ease-in-out duration-300"
//             enterFrom="translate-x-full"
//             enterTo="translate-x-0"
//             leave="transition-all ease-in-out duration-200"
//             leaveFrom="translate-x-0"
//             leaveTo="translate-x-full"
//           >
//             <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
//               <div className="flex items-center justify-between">
//                 <p className="text-lg font-semibold">My Cart</p>

//                 <button aria-label="Close cart" onClick={closeCart}>
//                   <CloseCart />
//                 </button>
//               </div>

//               {!cart || cart.lines.length === 0 ? (
//                 <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
//                   <ShoppingCartIcon className="h-16" />
//                   <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
//                 </div>
//               ) : (
//                 <div className="flex h-full flex-col justify-between overflow-hidden p-1">
//                   <ul className="flex-grow overflow-auto py-4">
//                     {cart.lines.map((item, i) => {
//                       const merchandiseSearchParams = {} as MerchandiseSearchParams;

//                       item.merchandise.selectedOptions.forEach(({ name, value }) => {
//                         if (value !== DEFAULT_OPTION) {
//                           merchandiseSearchParams[name.toLowerCase()] = value;
//                         }
//                       });

//                       const merchandiseUrl = createUrl(
//                         `/product/${item.merchandise.product.handle}`,
//                         new URLSearchParams(merchandiseSearchParams)
//                       );

//                       return (
//                         <li
//                           key={i}
//                           className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
//                         >
//                           <div className="relative flex w-full flex-row justify-between px-1 py-4">
//                             <div className="absolute z-40 -mt-2 ml-[55px]">
//                               <DeleteItemButton item={item} />
//                             </div>
//                             <Link
//                               href={merchandiseUrl}
//                               onClick={closeCart}
//                               className="z-30 flex flex-row space-x-4"
//                             >
//                               <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
//                                 <Image
//                                   className="h-full w-full object-cover"
//                                   width={64}
//                                   height={64}
//                                   alt={
//                                     item.merchandise.product.featuredImage.altText ||
//                                     item.merchandise.product.title
//                                   }
//                                   src={item.merchandise.product.featuredImage.url}
//                                 />
//                               </div>

//                               <div className="flex flex-1 flex-col text-base">
//                                 <span className="leading-tight">
//                                   {item.merchandise.product.title}
//                                 </span>
//                                 {item.merchandise.title !== DEFAULT_OPTION ? (
//                                   <p className="text-sm text-neutral-500 dark:text-neutral-400">
//                                     {item.merchandise.title}
//                                   </p>
//                                 ) : null}
//                               </div>
//                             </Link>
//                             <div className="flex h-16 flex-col justify-between">
//                               <Price
//                                 className="flex justify-end space-y-2 text-right text-sm"
//                                 amount={item.cost.totalAmount.amount}
//                                 currencyCode={item.cost.totalAmount.currencyCode}
//                               />
//                               <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
//                                 <EditItemQuantityButton item={item} type="minus" />
//                                 <p className="w-6 text-center">
//                                   <span className="w-full text-sm">{item.quantity}</span>
//                                 </p>
//                                 <EditItemQuantityButton item={item} type="plus" />
//                               </div>
//                             </div>
//                           </div>
//                         </li>
//                       );
//                     })}
//                   </ul>
//                   <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
//                     <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
//                       <p>Taxes</p>
//                       <Price
//                         className="text-right text-base text-black dark:text-white"
//                         amount={cart.cost.totalTaxAmount.amount}
//                         currencyCode={cart.cost.totalTaxAmount.currencyCode}
//                       />
//                     </div>
//                     <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
//                       <p>Shipping</p>
//                       <p className="text-right">Calculated at checkout</p>
//                     </div>
//                     <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
//                       <p>Total</p>
//                       <Price
//                         className="text-right text-base text-black dark:text-white"
//                         amount={cart.cost.totalAmount.amount}
//                         currencyCode={cart.cost.totalAmount.currencyCode}
//                       />
//                     </div>
//                   </div>
//                   <a
//                     href={cart.checkoutUrl}
//                     className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
//                   >
//                     Proceed to Checkout
//                   </a>
//                 </div>
//               )}
//             </Dialog.Panel>
//           </Transition.Child>
//         </Dialog>
//       </Transition>
//     </>
//   );
// }

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import type { Cart } from 'lib/shopify/types';
import { createUrl } from 'lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
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
  const [errors, setErrors] = useState<{ [key: string]: boolean[] }>({});

  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    if (cart?.totalQuantity !== quantityRef.current) {
      if (!isOpen) {
        setIsOpen(true);
      }
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef]);

  useEffect(() => {
    const loadChildNames = () => {
      try {
        const storedChildNames = localStorage.getItem('childNames');
        return storedChildNames ? JSON.parse(storedChildNames) : {};
      } catch (error) {
        console.error('Error loading child names from local storage:', error);
        return {};
      }
    };

    const storedNames = loadChildNames();
    const updatedChildNames = { ...storedNames };

    // Clean up removed items and adjust quantities
    Object.keys(updatedChildNames).forEach(id => {
      const cartItem = cart?.lines.find(line => line.id === id);
      if (!cartItem) {
        delete updatedChildNames[id];
      } else if (updatedChildNames[id].length !== cartItem.quantity) {
        updatedChildNames[id] = updatedChildNames[id].slice(0, cartItem.quantity);
        while (updatedChildNames[id].length < cartItem.quantity) {
          updatedChildNames[id].push('');
        }
      }
    });

    // Add new items
    cart?.lines.forEach((item) => {
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
  }, [cart?.lines]);

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
      return updatedChildNames;
    });
  };

  const prepareShopifyNotes = () => {
    const notes = cart?.lines.map(item => {
      const names = childNames[item.id]?.filter(name => name.trim() !== '');
      if (names && names.length > 0) {
        return `${item.merchandise.product.title}: ${names.join(', ')}`;
      }
      return null;
    }).filter(note => note !== null);

    return notes?.join(' | ');
  };

  const renderChildNameInputs = (item: Cart['lines'][number]) => {
    return childNames[item.id]?.map((name, index) => (
      <input
        key={`${item.id}-${index}`}
        type="text"
        value={name}
        onChange={(e) => handleChildNameChange(item.id, index, e.target.value)}
        placeholder={`Child ${index + 1}'s name`}
        className="mt-2 w-full rounded-md border border-neutral-200 px-3 py-2 text-sm placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-black dark:text-white dark:placeholder-neutral-400"
      />
    ));
  };

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
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
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {cart.lines.map((item, i) => {
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
                                    item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage.url}
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
                            {renderChildNameInputs(item)}
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
                        amount={cart.cost.totalTaxAmount.amount}
                        currencyCode={cart.cost.totalTaxAmount.currencyCode}
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
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <a
                    href={cart.checkoutUrl}
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}