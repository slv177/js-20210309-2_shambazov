/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {this[]}
 */

export function sortStrings(arr, param = 'asc') {
  let result = [...arr];
  result = result.sort(function (a, b) {
    return a.localeCompare(b, ["ru-ru-u-kf-upper"], { sensitivity: "case", caseFirst: "upper" });
  });
  if (param === 'desc') {
    result.reverse();
  }
  return result;
}
