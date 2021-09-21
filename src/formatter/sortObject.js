/* @flow */

export default function sortObject(value: any, objects = new Map()): any {
  // return non-object value as is
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // return date and regexp values as is
  if (value instanceof Date || value instanceof RegExp) {
    return value;
  }

  let sorted = objects.get(value);
  if (sorted) {
    return sorted;
  }

  if (Array.isArray(value)) {
    // make a copy of array with each item passed through sortObject()
    objects.set(value, (sorted = []));
    value.forEach((value, i) => {
      sorted[i] = sortObject(value, objects);
    });
  } else {
    // make a copy of object with key sorted
    objects.set(value, (sorted = {}));
    for (const key of Object.keys(value).sort()) {
      if (key !== '_owner') {
        sorted[key] = sortObject(value[key], objects);
      }
    }
  }

  return sorted;
}
