export const useWordEnding = (count: number, word: string) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  let reslWord;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    reslWord = word;
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    reslWord = word + 'а';
  } else {
    reslWord = word + 'ов';
  }

  return `${count} ${reslWord}`;
};
