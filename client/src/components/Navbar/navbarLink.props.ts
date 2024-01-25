/**
 * The built in NavBarLinkProps object.
 *
 * @external LinkProps
 * @see {@link https://nextjs.org/docs/api-reference/next/link} - Next.js LinkProps documentation.
 */
import { LinkProps } from 'next/link';

/**
 * Props for a navigation bar link.
 *
 * @interface
 * @augments external:LinkProps
 */
export default interface NavbarLinkProps extends LinkProps {
  /**
   * The content to be displayed as the link's label.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;
}
