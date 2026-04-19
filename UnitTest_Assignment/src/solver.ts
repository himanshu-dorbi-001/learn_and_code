export function countDivisors(n: number): number {
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error('n must be a positive integer');
  }

  let count = 0;
  const limit = Math.floor(Math.sqrt(n));

  for (let divisor = 1; divisor <= limit; divisor++) {
    if (n % divisor === 0) {
      count += divisor === n / divisor ? 1 : 2;
    }
  }

  return count;
}

export function countValidPairs(k: number): number {
  if (!Number.isInteger(k)) {
    throw new Error('k must be an integer');
  }
  if (k <= 2) {
    return 0;
  }

  let result = 0;
  for (let n = 2; n < k; n++) {
    if (countDivisors(n) === countDivisors(n + 1)) {
      result += 1;
    }
  }

  return result;
}

export function parseInput(input: string): number[] {
  if (!input) {
    return [];
  }

  const lines = input
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const t = Number(lines[0]);
  if (!Number.isInteger(t) || t < 0) {
    throw new Error('First line must be a non-negative integer count');
  }

  const values = lines.slice(1).map((line, index) => {
    const value = Number(line);
    if (!Number.isInteger(value)) {
      throw new Error(`Invalid integer on line ${index + 2}`);
    }
    return value;
  });

  if (values.length !== t) {
    throw new Error(`Expected ${t} test case(s) but found ${values.length}`);
  }

  return values;
}

export function solveTestCases(testCases: number[]): number[] {
  return testCases.map(countValidPairs);
}
