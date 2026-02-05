export function capitalize(str: string): string {
  const firstLetterCap = str.charAt(0).toUpperCase();
  const remainingLetters = str.slice(1);
  return firstLetterCap + remainingLetters;
}

export function camelCaseToPhrase(str: string): string {
  return str.replace(/([A-Z])/g, ' $1');
}
