const countryAdjacencyMap: Record<string, string[]> = {
  IN: ['Pakistan', 'China', 'Nepal', 'Bhutan', 'Bangladesh', 'Myanmar'],
  US: ['Canada', 'Mexico'],
  NZ: ['Australia']
};

export function getAdjacentCountries(countryCode: string): string[] | null {
  const normalizedCode = countryCode.toUpperCase();
  return countryAdjacencyMap[normalizedCode] ?? null;
}
