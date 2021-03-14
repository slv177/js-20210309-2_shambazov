/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = 'asc') {
  let result = [...arr]; // Copying array to new
  if (param === 'asc') {
    result = result.sort(function (a, b) {
      // sorting with defined criteria
      return a.localeCompare(b, ["ru-ru-u-kf-upper"], {sensitivity: "case"});
    });
  } if (param === 'desc') {
    // if descendant order, then reverse
    result = result.sort(function (a, b) {
      // sorting with defined criteria, swap A and B
      return b.localeCompare(a, ["ru-ru-u-kf-upper"], { sensitivity: "case"});
    });
  }
  return result;
}
