import { parseInput, solveTestCases } from './solver';

function main(): void {
  const stdin = process.stdin;
  let data = '';

  stdin.setEncoding('utf8');
  stdin.on('data', (chunk) => {
    data += chunk;
  });

  stdin.on('end', () => {
    try {
      const testCases = parseInput(data);
      const results = solveTestCases(testCases);
      process.stdout.write(results.join('\n'));
    } catch (error) {
      process.stderr.write(`Error: ${(error as Error).message}\n`);
      process.exitCode = 1;
    }
  });
}

if (require.main === module) {
  main();
}
