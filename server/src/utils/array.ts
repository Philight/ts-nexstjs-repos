/**
 * Partition the elements of an array based on a provided function
 * @param arr The array to partition
 * @param fn The function that determines which group each element belongs to
 * @returns An array containing two arrays - one for values that pass the condition, and one for values that don't
 */
export const partition = <T>(
  arr: T[], // The array to partition
  fn: (val: T, index: number, array: T[]) => boolean, // Function that decides which group each element belongs to
): [T[], T[]] =>
  // Reduce function to categorize elements into two groups
  arr.reduce(
    (acc: [T[], T[]], val: T, i: number, array: T[]) => {
      // Use the provided function to determine which group the element belongs to
      acc[fn(val, i, array) ? 0 : 1].push(val); // If the function returns true for the element, push it into the 0th array, otherwise push it into the 1st array
      return acc; // Return the updated accumulator
    },
    [[], []], // Initial accumulator with two empty arrays
  );

/**
 * Removes a specific property from each object in an array.
 * @param arr - The array of objects.
 * @param propName - The name of the property to be removed.
 * @returns A new array with the specified property removed from each object.
 */
type AnyObject = { [key: string]: any };
export const removePropertyFromArray = <T extends AnyObject>(
  arr: T[],
  propName: string,
): Omit<T, string>[] => {
  return arr.map(({ [propName]: _, ...rest }) => rest);
};
