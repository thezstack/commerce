'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';

type WindowWithGtag = Window & {
  gtag?: (command: 'event', eventName: string, params?: Record<string, string>) => void;
};

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventLabel?: string;
};

export default function TrackedLink({
  eventName,
  eventLabel,
  onClick,
  children,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        (window as WindowWithGtag).gtag?.('event', eventName, {
          event_category: 'for_schools',
          event_label: eventLabel || ''
        });
        if (typeof props.href === 'string' && props.href.startsWith('#')) {
          const target = document.querySelector(props.href);
          if (target) {
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.replaceState(null, '', props.href);
          }
        }
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
