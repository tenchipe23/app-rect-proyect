/**
 * Utility functions and types for List component
 */

export type ListProps = {
    data: string[];
    onSelect?: (item: string) => void;
  };
  
  /**
   * Creates a new array with an additional item
   * @param data Original array of strings
   * @param newItem Item to add to the array
   * @returns New array with the added item
   */
  export function addItemToList(data: string[], newItem: string): string[] {
    return [...data, newItem];
  }
  
  /**
   * Removes an item from the list at the specified index
   * @param data Array of strings
   * @param index Index of the item to remove
   * @returns New array with the item removed
   */
  export function removeItemFromList(data: string[], index: number): string[] {
    return data.filter((_, i) => i !== index);
  }
  
  /**
   * Removes the end item from the list
   * @param data Array of strings
   * @returns New array with the item removed
   */
  
  export function removeEndItemFromList(data: string[]): string[] {
    return data.slice(0, -1);
  }