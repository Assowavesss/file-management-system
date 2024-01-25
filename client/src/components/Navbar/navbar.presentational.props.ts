import type NavbarLinkProps from './navbarLink.props';
import type { SpringValue } from '@react-spring/web';

type NavbarPresentationalProps = {
  phone: boolean;
  springs: {
    y: SpringValue<number>;
    opacity: SpringValue<number>;
    display: SpringValue<string>;
  };
  navbarItems: NavbarLinkProps[];
  navbarItemsExtended: NavbarLinkProps[];
  onClick: () => void;
};

export default NavbarPresentationalProps;
