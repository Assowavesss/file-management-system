'use client';

import { useState, useEffect } from 'react';
import { useSpring } from '@react-spring/web';
import type NavbarLinkProps from './navbarLink.props';
import type NavbarContainerProps from './navbar.container.props';
import NavbarPresentational from './navbar.presentational';

/**
 * Navbar component.
 *
 * @return {JSX.Element} Rendered component
 */
const NavbarContainer = ({ roleId }: NavbarContainerProps): JSX.Element => {
  /**
   * State to handle phone view mode.
   *
   * @type {boolean}
   */
  const [phone, setPhone] = useState<boolean>(false);

  /**
   * Animation spring for the extended navbar view.
   *
   * @type {import('@react-spring/web').UseSpringResult<{ y: number, opacity: number, display: string }>}
   */
  const [springs, api] = useSpring(() => ({
    from: {
      y: 0,
      opacity: 0,
      display: 'none',
    },
  }));

  /**
   * Effect to update the animation spring when the phone state changes.
   */
  useEffect(() => {
    api.start({
      from: {
        display: 'flex',
      },
      to: {
        y: phone ? 5 : 0,
        opacity: phone ? 2 : 0,
        display: phone ? 'flex' : 'none',
      },
      delay: 100,
    });
  }, [phone, api]);

  const checkRole = (roleId: string): NavbarLinkProps[] => {
    const navbarLinkRef: NavbarLinkProps[] = [
      {
        href: '/home',
        children: 'Home',
      },
      {
        href: '/space',
        children: 'Your space',
      },
      {
        href: '/create',
        children: 'Create a space',
      },
    ];

    switch (roleId) {
      case '2':
        return navbarLinkRef.slice(0, 2);
      case '3':
        return navbarLinkRef;
      default:
        return navbarLinkRef.slice(0, 1);
    }
  };

  const navbarItems: NavbarLinkProps[] = checkRole(roleId);

  const navbarItemsExtended: NavbarLinkProps[] = [
    ...[
      {
        href: '/',
        children: 'Logout',
      },
    ],
    ...navbarItems,
  ];

  return (
    <NavbarPresentational
      phone={phone}
      springs={springs}
      navbarItems={navbarItems}
      navbarItemsExtended={navbarItemsExtended}
      onClick={() => setPhone(!phone)}
    />
  );
};

export default NavbarContainer;
