export const countErrors = (input: string, expected: string) => {
  const expectedChars = expected.split("");
  return expectedChars.reduce((errors, eChar, index) => {
    const aChar = input[index];
    if (aChar != eChar) {
      errors++;
    }
    return errors;
  }, 0);
};

export const calAccuracy = (errors: number, total: number) => {
  if (total > 0) {
    const correct = total - errors;
    const accuracy = (correct / total) * 100;
    return accuracy;
  }
  return 0;
};

export const calwpm = (totalTyped: number, time: number) => {
    const wpm = totalTyped / 5 / (time / 60);
    return Math.round(wpm);
};
