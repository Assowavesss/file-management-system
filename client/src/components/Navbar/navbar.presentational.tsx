import Link from 'next/link';
import Image from 'next/image';
import Burger from '@public/burger.svg';
import List from '@/lib/List';
import { animated } from '@react-spring/web';
import type NavbarPresentationalProps from './navbar.presentational.props';

const NavbarPresentational = ({
  phone,
  springs,
  navbarItems,
  navbarItemsExtended,
  onClick,
}: NavbarPresentationalProps): JSX.Element => {
  return (
    <div className='bg-black text-white'>
      <nav className='mx-4 flex flex-row items-center justify-between gap-16'>
        <div className='m-4 flex flex-row items-center gap-10'>
          <Image
            priority
            src='logo.svg'
            height={200}
            width={250}
            alt='logo efrei'
          />
          <ul className='hidden md:flex md:flex-row md:gap-8'>
            <List
              items={navbarItems}
              renderItem={(item, key) => (
                <li key={key}>
                  <Link
                    className='hover:text-blue-400'
                    href={item.href}
                  >
                    {item.children}
                  </Link>
                </li>
              )}
            />
          </ul>
        </div>
        <Link
          className='hidden md:block md:items-center md:rounded-full md:border-2 md:border-white md:px-4 md:py-1 md:hover:border-blue-400 md:hover:bg-blue-400'
          href='/'
        >
          Logout
        </Link>
        <Burger
          className='block transition-all md:hidden'
          onClick={onClick}
        />
      </nav>
      {phone && (
        <animated.div
          className='flex flex-col items-center md:hidden'
          style={{ ...springs }}
        >
          <List
            items={navbarItemsExtended}
            renderItem={(item, key) => (
              <Link
                className='m-2 hover:text-blue-400 md:hidden'
                key={key}
                href={item.href}
              >
                {item.children}
              </Link>
            )}
          />
        </animated.div>
      )}
    </div>
  );
};

export default NavbarPresentational;
