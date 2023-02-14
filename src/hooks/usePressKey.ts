export const usePressKey = (e: any, keyPress: string) => {
  if (e.key === keyPress) {
    e.preventDefault();
  }
};
