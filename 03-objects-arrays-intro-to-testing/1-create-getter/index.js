/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const keys = path.split('.');

  return function (mainObject){
    if(keys.length === 0) return;
    let currentObject = mainObject;
    while(keys.length) {
      let currentKey = keys.shift();
      if(!currentObject.hasOwnProperty(currentKey)) {
        return undefined;
      } else {
        currentObject = currentObject[currentKey];
      }
    }
    return currentObject;
  }
}
