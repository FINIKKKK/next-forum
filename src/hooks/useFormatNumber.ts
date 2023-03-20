export const useFormatNumber = (number: number) => {
  if (number >= 1000) {
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixNum = Math.floor(('' + number).length / 3);
    let shortNum = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));
    if (shortNum % 1 !== 0) {
      shortNum = shortNum.toFixed(1);
    }
    return shortNum + suffixes[suffixNum];
  }
  return number;
}