/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */

export function trimSymbols(string, size) {
  if (size === undefined) {
    return string;
  }
  let result = "";
  let mainCounter = 0; // Это главный счетчик, для определения начала блока одинаковых симовлов
  let secondCounter = 1; // Это вспомогательный счетчик, для определения конца блокоа одинаковых симовлов
  while (mainCounter < string.length) {
    const firstCharacter = string.charAt(mainCounter); // для читаемости кода явно определяем символы
    const secondCharacter = string.charAt(secondCounter);
    if (firstCharacter === secondCharacter) {
      secondCounter += 1; // если символы одинаковы, то сдвигаем вспомогательный счетчик далее
    } else {
      //если символы отличаются, то находим, сколько раз надо записать символ в результат (наименьшее из size или длины блока)
      const multiplier = secondCounter - mainCounter < size ? secondCounter - mainCounter : size;
      result += (firstCharacter.repeat(multiplier)); // дописываем в результат последовательность симовлов
      mainCounter = secondCounter; //сдвигаем главный счетчик на начало нового блока
    }
  }
  return result;
}
