import { countDivisors, countValidPairs, parseInput, solveTestCases } from '../src/solver';

describe('Divisor pair solver', () => {
  test('countDivisors returns correct divisor counts', () => {
    expect(countDivisors(1)).toBe(1);
    expect(countDivisors(2)).toBe(2);
    expect(countDivisors(3)).toBe(2);
    expect(countDivisors(4)).toBe(3);
    expect(countDivisors(14)).toBe(4);
    expect(countDivisors(15)).toBe(4);
  });

  test('countDivisors throws for invalid input', () => {
    expect(() => countDivisors(0)).toThrow('n must be a positive integer');
    expect(() => countDivisors(-5)).toThrow('n must be a positive integer');
    expect(() => countDivisors(2.5)).toThrow('n must be a positive integer');
  });

  test('countValidPairs returns expected number for sample input', () => {
    expect(countValidPairs(15)).toBe(2);
  });

  test('countValidPairs handles small k values', () => {
    expect(countValidPairs(2)).toBe(0);
    expect(countValidPairs(3)).toBe(1);
    expect(countValidPairs(4)).toBe(1);
  });

  test('countValidPairs throws for non-integer k', () => {
    expect(() => countValidPairs(5.2)).toThrow('k must be an integer');
  });

  test('parseInput reads test cases correctly', () => {
    const input = '3\n15\n2\n100\n';
    expect(parseInput(input)).toEqual([15, 2, 100]);
  });

  test('parseInput throws for bad input', () => {
    expect(() => parseInput('abc')).toThrow('First line must be a non-negative integer count');
    expect(() => parseInput('2\n15')).toThrow('Expected 2 test case(s) but found 1');
    expect(() => parseInput('1\n3.5')).toThrow('Invalid integer on line 2');
  });

  test('solveTestCases returns counts for each test case', () => {
    expect(solveTestCases([15, 3])).toEqual([2, 1]);
  });
});
