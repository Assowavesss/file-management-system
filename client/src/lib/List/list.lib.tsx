import ListProps from './list.props';

/**
 * A generic list component that renders a list of items using a custom render function.
 *
 * @template T - The type of items in the list.
 * @param {ListProps<T>} props - The properties for the List component.
 * @returns {JSX.Element} The JSX element representing the rendered list.
 * @see {@link ListProps<T>} for further information
 */
const List = <T,>({ items, renderItem }: ListProps<T>): JSX.Element => {
  /**
   * Renders each item in the list using the provided render function.
   *
   * @param {T} item - The item to be rendered.
   * @param {number} key - The unique key for the item.
   * @returns {JSX.Element} The JSX element representing the rendered item.
   */
  const renderItems = (item: T, key: number): JSX.Element =>
    renderItem(item, key);

  return <>{items.map(renderItems)}</>;
};

export default List;
