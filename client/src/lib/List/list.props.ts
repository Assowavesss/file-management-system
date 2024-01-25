/**
 * Represents the properties for the List component.
 *
 * @template T - The type of items in the list.
 */
export default interface ListProps<T> {
  /**
   * An array of items to be rendered in the list.
   *
   * @type {T[]}
   */
  items: T[];

  /**
   * A function that renders each item in the list.
   *
   * @callback RenderItemFunction
   * @param {T} item - The item to be rendered.
   * @param {number} key - The unique key for the item.
   * @returns {JSX.Element} The JSX element representing the rendered item.
   */

  /**
   * The function to render each item in the list.
   *
   * @type {RenderItemFunction}
   */
  renderItem: (item: T, key: number) => JSX.Element;
}
