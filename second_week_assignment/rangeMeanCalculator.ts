import * as readline from "readline";

class RangeMeanCalculator {
  private readonly prefixSums: bigint[];

  constructor(numbers: bigint[]) {
    this.prefixSums = new Array(numbers.length + 1).fill(BigInt(0));

    for (let i = 0; i < numbers.length; i++) {
      this.prefixSums[i + 1] = this.prefixSums[i] + numbers[i];
    }
  }

  public getMean(leftIndex: number, rightIndex: number): bigint {
    if (leftIndex < 1 || rightIndex >= this.prefixSums.length) {
      throw new Error("Index out of bounds");
    }

    const sumInRange =
      this.prefixSums[rightIndex] - this.prefixSums[leftIndex - 1];
    const count = BigInt(rightIndex - leftIndex + 1);

    if (count <= BigInt(0)) {
      throw new Error("Invalid range: count must be positive");
    }

    return sumInRange / count;
  }
}

class InputHelper {
  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  public async readLine(): Promise<string> {
    return new Promise((resolve) => this.rl.question("", resolve));
  }

  public async readTwoNumbers(): Promise<[number, number]> {
    const line = await this.readLine();
    const parts = line.trim().split(/\s+/);

    if (parts.length !== 2) {
      throw new Error("Expected exactly 2 numbers");
    }

    const first = parseInt(parts[0], 10);
    const second = parseInt(parts[1], 10);

    if (isNaN(first) || isNaN(second)) {
      throw new Error("Invalid number input");
    }

    return [first, second];
  }

  public async readArray(size: number): Promise<bigint[]> {
    const line = await this.readLine();
    const parts = line.trim().split(/\s+/);

    if (parts.length !== size) {
      throw new Error(`Expected ${size} elements but received ${parts.length}`);
    }

    return parts.map((val, idx) => {
      const parsed = BigInt(val);
      if (isNaN(Number(val))) {
        throw new Error(`Invalid number at index ${idx}: ${val}`);
      }
      return parsed;
    });
  }

  public close(): void {
    this.rl.close();
  }
}

async function main(): Promise<void> {
  const inputHelper = new InputHelper();
  const [sizeOfArray, queryCount] = await inputHelper.readTwoNumbers();
  const data = await inputHelper.readArray(sizeOfArray);
  const calculator = new RangeMeanCalculator(data);
  for (let i = 0; i < queryCount; i++) {
    const [left, right] = await inputHelper.readTwoNumbers();
    const result = calculator.getMean(left, right);
    console.log(result.toString());
  }
  inputHelper.close();
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
});
