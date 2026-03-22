'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { addItem } from 'components/cart/actions';
import LoadingDots from 'components/loading-dots';
import { ProductVariant } from 'lib/shopify/types';
import { usePathname, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';

function SubmitButton({
  availableForSale,
  selectedVariantId
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-[#0B80A7] p-4 tracking-wide text-white';
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60';

  if (!availableForSale) {
    return null;
  }

  if (!selectedVariantId) {
    return (
      <button
        type="button"
        disabled
        aria-label="Please select an option"
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Add To Cart
      </button>
    );
  }

  return (
    <button
      type="submit"
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      disabled={pending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': true,
        [disabledClasses]: pending
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? <LoadingDots className="mb-3 bg-white" /> : <PlusIcon className="h-5" />}
      </div>
      Add To Cart
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  productTitle,
  productHandle,
  schoolName
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  productTitle: string;
  productHandle: string;
  schoolName?: string;
}) {
  const [state, formAction] = useActionState(addItem, {});
  const [isSubmittingRequest, setIsSubmittingRequest] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [requestError, setRequestError] = useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === searchParams.get(option.name.toLowerCase())
    )
  );
  const selectedVariantId = variant?.id || defaultVariantId;
  const actionWithVariant = formAction.bind(null, selectedVariantId);

  useEffect(() => {
    if (state?.updatedAt) {
      window.dispatchEvent(new CustomEvent('cart:updated', { detail: { open: true } }));
    }
  }, [state?.updatedAt]);

  const submitRestockRequest = async () => {
    setIsSubmittingRequest(true);
    setRequestError('');

    try {
      const response = await fetch('/api/restock-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName: productTitle,
          productHandle,
          schoolName: schoolName ?? '',
          variantTitle: variant?.title === 'Default Title' ? '' : variant?.title ?? '',
          pagePath: pathname
        })
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setRequestError(result.error || 'Failed to submit request. Please try again.');
        return;
      }

      setRequestSubmitted(true);
    } catch (error) {
      console.error('Restock request failed:', error);
      setRequestError('Failed to submit request. Please try again.');
    } finally {
      setIsSubmittingRequest(false);
    }
  };

  if (!availableForSale) {
    return (
      <div className="space-y-3">
        <button
          type="button"
          onClick={submitRestockRequest}
          disabled={isSubmittingRequest || requestSubmitted}
          className={clsx(
            'relative flex w-full items-center justify-center rounded-full bg-[#0B80A7] p-4 tracking-wide text-white transition',
            {
              'hover:opacity-90': !isSubmittingRequest && !requestSubmitted,
              'cursor-not-allowed opacity-70': isSubmittingRequest || requestSubmitted
            }
          )}
        >
          {isSubmittingRequest ? 'Sending request...' : requestSubmitted ? 'Request sent' : 'Request more inventory'}
        </button>
        <p className="text-sm leading-6 text-gray-600">
          Out of stock right now. Send a quick request and we&apos;ll let our team know this kit needs attention.
        </p>
        {requestError ? <p className="text-sm text-[#B42318]">{requestError}</p> : null}
      </div>
    );
  }

  return (
    <form action={actionWithVariant}>
      <SubmitButton availableForSale={availableForSale} selectedVariantId={selectedVariantId} />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.error}
      </p>
    </form>
  );
}
