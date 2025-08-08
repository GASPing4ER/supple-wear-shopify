import {useParams, Form, Await, useRouteLoaderData} from '@remix-run/react';
import useWindowScroll from 'react-use/esm/useWindowScroll';
import {Disclosure} from '@headlessui/react';
import {Suspense, useEffect, useMemo} from 'react';
import {CartForm, Image} from '@shopify/hydrogen';
import {Facebook, Instagram} from 'lucide-react';

import {type LayoutQuery} from 'storefrontapi.generated';
import {Text, Heading, Section} from '~/components/Text';
import {Link} from '~/components/Link';
import {Cart} from '~/components/Cart';
import {CartLoading} from '~/components/CartLoading';
import {Drawer, useDrawer} from '~/components/Drawer';
import {CountrySelector} from '~/components/CountrySelector';
import {IconMenu, IconCaret, IconBag} from '~/components/Icon';
import {
  type EnhancedMenu,
  type ChildEnhancedMenuItem,
  useIsHomePath,
} from '~/lib/utils';
import {useIsHydrated} from '~/hooks/useIsHydrated';
import {useCartFetchers} from '~/hooks/useCartFetchers';
import type {RootLoader} from '~/root';

import {AfterFooter} from './AfterFooter';
import Newsletter from './Newsletter';
import CountdownBanner from './CountdownBanner';

type LayoutProps = {
  children: React.ReactNode;
  language: string;
  layout?: LayoutQuery & {
    headerMenu?: EnhancedMenu | null;
    footerMenu?: EnhancedMenu | null;
  };
};

export function PageLayout({children, language, layout}: LayoutProps) {
  const {headerMenu, footerMenu} = layout || {};
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <div className="fixed uppercase font-medium top-0 left-0 w-full bg-[#F5F5DC] h-[80px] lg:h-[60px] text-black text-center text-xs sm:text-sm md:text-base flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-12 z-10">
          <CountdownBanner />
          {/* <p className="uppercase">
            <strong>EXCLUSIVE</strong> SUMMER SALE, UP T0{' '}
            <strong>30% OFF</strong>
          </p>
          <div className="flex gap-4 items-center">
            <p className="hidden sm:block">Use Codes:</p>
            <span className="bg-black text-white py-1 px-4 rounded-xl font-semibold lowercase">
              supple20
            </span>
            or
            <span className="bg-black text-white py-1 px-4 rounded-xl font-semibold lowercase">
              supple30
            </span>
            (3 items or more)
          </div> */}
        </div>
        {headerMenu && layout?.shop.name && (
          <Header title={layout.shop.name} menu={headerMenu} />
        )}
        <main role="main" id="mainContent" className="flex-grow mt-[60px]">
          {children}
        </main>
      </div>
      <div className="flex flex-col items-center p-6 border-b">
        <Newsletter language={language} />
      </div>
      {footerMenu && <Footer language={language} menu={footerMenu} />}
      <AfterFooter />
    </>
  );
}

function Header({title, menu}: {title: string; menu?: EnhancedMenu}) {
  const isHome = useIsHomePath();

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  const addToCartFetchers = useCartFetchers(CartForm.ACTIONS.LinesAdd);

  // toggle cart drawer when adding to cart
  useEffect(() => {
    if (isCartOpen || !addToCartFetchers.length) return;
    openCart();
  }, [addToCartFetchers, isCartOpen, openCart]);

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      {menu && (
        <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      )}
      <DesktopHeader
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function CartDrawer({isOpen, onClose}: {isOpen: boolean; onClose: () => void}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <Suspense fallback={<CartLoading />}>
          <Await resolve={rootData?.cart}>
            {(cart) => <Cart layout="drawer" onClose={onClose} cart={cart} />}
          </Await>
        </Suspense>
      </div>
    </Drawer>
  );
}

export function MenuDrawer({
  isOpen,
  onClose,
  menu,
}: {
  isOpen: boolean;
  onClose: () => void;
  menu: EnhancedMenu;
}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({
  menu,
  onClose,
}: {
  menu: EnhancedMenu;
  onClose: () => void;
}) {
  return (
    <nav className="flex flex-col items-center justify-center h-screen gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* Top level menu items */}
      {(menu?.items || []).map((item) => (
        <span key={item.id} className="block">
          <Link
            to={item.to}
            target={item.target}
            onClick={onClose}
            className={({isActive}) =>
              isActive
                ? 'pb-1 border-b -mb-px uppercase philosopher'
                : 'pb-1 uppercase philosopher'
            }
          >
            <Text as="span" size="copy">
              {item.title}
            </Text>
          </Link>
        </span>
      ))}
    </nav>
  );
}

function MobileHeader({
  title,
  isHome,
  openCart,
  openMenu,
}: {
  title: string;
  isHome: boolean;
  openCart: () => void;
  openMenu: () => void;
}) {
  // useHeaderStyleFix(containerStyle, setContainerStyle, isHome);

  const params = useParams();

  return (
    <header
      role="banner"
      className={`${
        isHome ? 'bg-primary/80 text-contrast' : 'bg-contrast/80 text-primary'
      } flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-[80px] justify-between w-full leading-none gap-4 px-4 md:px-8`}
    >
      <div className="flex items-center justify-start w-full gap-4">
        <button
          onClick={openMenu}
          className="relative flex items-center justify-center w-8 h-8"
        >
          <IconMenu />
        </button>
        {/* <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="items-center gap-2 sm:flex"
        >
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8"
          >
            <IconSearch />
          </button>
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
        </Form> */}
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-bold text-center leading-none cormorant text-xl"
          as={isHome ? 'h1' : 'h2'}
        >
          SUPPLE
        </Heading>
      </Link>

      <div className="flex items-center justify-end w-full gap-4">
        {/* <AccountLink className="relative flex items-center justify-center w-8 h-8" /> */}
        <a href="https://www.tiktok.com/@supplewear?_t=8sNa8Wrcc9m&_r=1">
          <img
            src="/icons/tiktok.svg"
            alt="tiktok"
            className="w-[18px] h-[18px]"
          />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61562103220296">
          <Facebook height={18} width={18} />
        </a>
        <a href="https://www.instagram.com/supplewear/">
          <Instagram height={18} width={18} />
        </a>
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

function DesktopHeader({
  isHome,
  menu,
  openCart,
  title,
}: {
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
}) {
  const params = useParams();
  const {y} = useWindowScroll();
  return (
    <header
      role="banner"
      className={`relative ${
        isHome ? 'bg-primary/80 text-contrast' : 'bg-contrast/80 text-primary'
      } ${
        !isHome && y > 50 && ' shadow-lightHeader'
      } hidden h-nav lg:flex items-center sticky transition duration-300 backdrop-blur-lg z-40 top-[60px] justify-between w-full leading-none gap-8 px-12 py-8`}
    >
      <div className="flex gap-12">
        <nav className="flex gap-8">
          {/* Top level menu items */}
          {(menu?.items || []).map((item) => (
            <Link
              key={item.id}
              to={item.to}
              target={item.target}
              prefetch="intent"
              className={({isActive}) =>
                isActive
                  ? 'pb-1 border-b -mb-px uppercase philosopher text-sm'
                  : 'pb-1 uppercase philosopher text-sm'
              }
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <img
        src="/logo.svg"
        alt="logo"
        className="w-[75px] h-[75px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"
      />
      <Link
        className="font-bold cursor-pointer cormorant text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        to="/"
        prefetch="intent"
      >
        SUPPLE
      </Link>
      <div className="flex items-center gap-2">
        {/* <Form
          method="get"
          action={params.locale ? `/${params.locale}/search` : '/search'}
          className="flex items-center gap-2"
        >
          <Input
            className={
              isHome
                ? 'focus:border-contrast/20 dark:focus:border-primary/20'
                : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Search"
            name="q"
          />
          <button
            type="submit"
            className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
          >
            <IconSearch />
          </button>
        </Form> */}
        {/* <AccountLink className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5" /> */}
        <a
          href="https://www.tiktok.com/@supplewear?_t=8sNa8Wrcc9m&_r=1"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src="/icons/tiktok.svg"
            alt="tiktok"
            className="w-[18px] h-[18px]"
          />
        </a>
        <a
          href="https://www.facebook.com/profile.php?id=61562103220296"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook height={18} width={18} />
        </a>
        <a
          href="https://www.instagram.com/supplewear/"
          target="_blank"
          rel="noreferrer"
        >
          <Instagram height={18} width={18} />
        </a>
        <CartCount isHome={isHome} openCart={openCart} />
      </div>
    </header>
  );
}

// function AccountLink({className}: {className?: string}) {
//   const rootData = useRouteLoaderData<RootLoader>('root');
//   const isLoggedIn = rootData?.isLoggedIn;

//   return (
//     <Link to="/account" className={className}>
//       <Suspense fallback={<IconLogin />}>
//         <Await resolve={isLoggedIn} errorElement={<IconLogin />}>
//           {(isLoggedIn) => (isLoggedIn ? <IconAccount /> : <IconLogin />)}
//         </Await>
//       </Suspense>
//     </Link>
//   );
// }

function CartCount({
  isHome,
  openCart,
}: {
  isHome: boolean;
  openCart: () => void;
}) {
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) return null;

  return (
    <Suspense fallback={<Badge count={0} dark={isHome} openCart={openCart} />}>
      <Await resolve={rootData?.cart}>
        {(cart) => (
          <Badge
            dark={isHome}
            openCart={openCart}
            count={cart?.totalQuantity || 0}
          />
        )}
      </Await>
    </Suspense>
  );
}

function Badge({
  openCart,
  dark,
  count,
}: {
  count: number;
  dark: boolean;
  openCart: () => void;
}) {
  const isHydrated = useIsHydrated();

  const BadgeCounter = useMemo(
    () => (
      <>
        <IconBag />
        <div
          className={`
             text-contrast bg-primary absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
          <span>{count || 0}</span>
        </div>
      </>
    ),
    [count],
  );

  return isHydrated ? (
    <button
      onClick={openCart}
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </button>
  ) : (
    <Link
      to="/cart"
      className="relative flex items-center justify-center w-8 h-8 focus:ring-primary/5"
    >
      {BadgeCounter}
    </Link>
  );
}

function Footer({menu, language}: {menu?: EnhancedMenu; language: string}) {
  const isHome = useIsHomePath();
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section
      divider={isHome ? 'none' : 'top'}
      as="footer"
      role="contentinfo"
      className={`grid items-start grid-flow-row w-full gap-6 py-8 px-6 md:px-8 lg:px-12 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-${itemsCount}
        bg-primary text-contrast`}
    >
      <FooterMenu menu={menu} />
      <CountrySelector language={language} />
    </Section>
  );
}

function FooterLink({item}: {item: ChildEnhancedMenuItem}) {
  if (item.to.startsWith('http')) {
    return (
      <a
        href={item.to}
        target={item.target}
        rel="noopener noreferrer"
        className="cormorant"
      >
        {item.title}
      </a>
    );
  }

  return (
    <Link
      to={item.to}
      target={item.target}
      prefetch="intent"
      className="cormorant"
    >
      {item.title}
    </Link>
  );
}

function FooterMenu({menu}: {menu?: EnhancedMenu}) {
  const styles = {
    section: 'grid gap-4',
    nav: 'grid gap-2 pb-6',
  };

  return (
    <>
      {(menu?.items || []).map((item) => (
        <section key={item.id} className={styles.section}>
          <Disclosure>
            {({open}) => (
              <>
                <Disclosure.Button className="text-left md:cursor-default">
                  <Heading
                    className="flex justify-between philosopher text-xl"
                    size="lead"
                    as="h3"
                  >
                    {item.title}
                    {item?.items?.length > 0 && (
                      <span className="md:hidden">
                        <IconCaret direction={open ? 'up' : 'down'} />
                      </span>
                    )}
                  </Heading>
                </Disclosure.Button>
                {item?.items?.length > 0 ? (
                  <div
                    className={`${
                      open ? `max-h-48 h-fit` : `max-h-0 md:max-h-fit`
                    } overflow-hidden transition-all duration-300`}
                  >
                    <Suspense data-comment="This suspense fixes a hydration bug in Disclosure.Panel with static prop">
                      <Disclosure.Panel static>
                        <nav className={styles.nav}>
                          {item.items.map((subItem: ChildEnhancedMenuItem) => (
                            <FooterLink key={subItem.id} item={subItem} />
                          ))}
                        </nav>
                      </Disclosure.Panel>
                    </Suspense>
                  </div>
                ) : null}
              </>
            )}
          </Disclosure>
        </section>
      ))}
    </>
  );
}
