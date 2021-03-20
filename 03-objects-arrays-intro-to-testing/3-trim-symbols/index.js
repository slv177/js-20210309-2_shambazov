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
    let firstCharacter = string.charAt(mainCounter); // для читаемости кода в операции сравнения явно определяем симовлы
    let secondCharacter = string.charAt(secondCounter);
    if (firstCharacter === secondCharacter) {
      secondCounter += 1; // если символы одинаковы, то сдвигаем вспомогательный счетчик далее
    } else {
      //если символы отличаются, то находим наименьшее между size и длиной блока (т.е. если блок будет короче size)
      let multiplyer = secondCounter - mainCounter < size ? secondCounter - mainCounter : size;
      mainCounter = secondCounter;
      result += (firstCharacter.repeat(multiplyer)); // дописываем в результат последовательность симовлов
    }
  }
  return result;
}
