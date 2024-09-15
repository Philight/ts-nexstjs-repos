type GenericObject = { [key: string]: any };

/**
 * Function to mutate an object deeply at a specified path
 * @param obj The object to be mutated
 * @param path The path to the property to be mutated (e.g., 'nestedObject.subKey2')
 * @param value The value to set at the specified path
 */
export const deepMutate = (
  obj: GenericObject,
  path: string,
  value: any,
): void => {
  const keys = path.split('.');

  if (value === undefined) return;

  function setPropertyRecursive(
    obj: GenericObject,
    keys: string[],
    value: any,
    index: number = 0,
  ): void {
    // Check if we have reached the final key in the path
    if (index === keys.length - 1) {
      obj[keys[index]] = value; // Set the value at the final key
      return;
    }

    // Check if the current key does not exist or is not an object
    if (!obj[keys[index]] || typeof obj[keys[index]] !== 'object') {
      obj[keys[index]] = {}; // Create an empty object if not already present
    }

    // Recursively call with the next key in the path
    setPropertyRecursive(obj[keys[index]], keys, value, index + 1);
  }

  // Start the recursion with the provided object and keys
  setPropertyRecursive(obj, keys, value);
};
