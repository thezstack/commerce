import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
const additionalNavigation: Menu[] = [
  { title: 'School & PTO Resources', path: '/blog' },
  { title: 'TEFA Parents', path: '/tefa-parents' }
];

export default async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');
  const normalizedMenu = menu.map((item) =>
    [
      '/blog',
      '/resources',
      'https://schoolkits.org/blog',
      'https://schoolkits.org/resources'
    ].includes(item.path)
      ? { title: 'School & PTO Resources', path: '/blog' }
      : item
  );
  const navigationMenu = [...normalizedMenu, ...additionalNavigation].filter(
    (item, index, items) => items.findIndex((entry) => entry.path === item.path) === index
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E5E5] bg-white py-4 shadow-sm">
      <nav
        aria-label="Main navigation"
        className="flex items-center gap-3 px-4 sm:px-6 lg:gap-6 lg:px-8"
      >
        <div className="block flex-none lg:hidden">
          <Suspense fallback={<div className="h-11 w-11" aria-hidden="true" />}>
            <MobileMenu menu={navigationMenu} />
          </Suspense>
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-6">
          <Link href="/" className="flex flex-1 items-center justify-center lg:flex-none">
            <LogoSquare />
            <div className="ml-2 font-['Futura'] text-2xl font-extrabold leading-[110%]">
              SchoolKits
            </div>
          </Link>
          {navigationMenu.length ? (
            <ul className="hidden flex-1 items-center gap-4 text-sm lg:flex xl:gap-6">
              {navigationMenu.map((item: Menu) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="inline-flex min-h-11 items-center font-semibold text-custom-blue underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#073B4C]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="flex flex-none justify-end">
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </nav>
    </header>
  );
}
