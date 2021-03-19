/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */


export function sortStrings(arr, param = 'asc') {
  let result = [...arr]; // Copying array to new
  result = result.sort(function (a, b) {
    if (param === 'desc'){
      return b.localeCompare(a, ["ru-ru-u-kf-upper"], {sensitivity: "case"});
    }
    return a.localeCompare(b, ["ru-ru-u-kf-upper"], {sensitivity: "case"});
  });
  return result;
}
