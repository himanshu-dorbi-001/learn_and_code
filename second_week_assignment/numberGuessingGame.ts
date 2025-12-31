import * as readline from "readline";

function isValidGuess(input: string): boolean {
  const trimmedInput = input.trim();

  if (trimmedInput.length === 0) {
    console.log("Input cannot be empty.");
    return false;
  }

  if (
    trimmedInput.toLowerCase() === "exit" ||
    trimmedInput.toLowerCase() === "quit"
  ) {
    console.log("Exiting the game. Thanks for playing!");
    process.exit(0);
  }

  if (!/^\d+$/.test(trimmedInput)) {
    console.log("Input must be a number.");
    return false;
  }

  const number = Number(trimmedInput);

  if (number < 1 || number > 100) {
    console.log("Number must be between 1 and 100.");
    return false;
  }

  return true;
}

function generateRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function playNumberGuessingGame(): Promise<void> {
  const targetNumber = generateRandomNumber(1, 100);
  let attempts = 0;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => rl.question(question, resolve));
  };

  let guessedCorrectly = false;

  while (!guessedCorrectly) {
    const userInput = await askQuestion(
      "Guess a number between 1 and 100: "
    );

    if (!isValidGuess(userInput)) {
      continue;
    }

    const guess = Number(userInput.trim());
    attempts++;

    if (guess < targetNumber) {
      console.log("Too low. Try again.");
    } else if (guess > targetNumber) {
      console.log("Too high. Try again.");
    } else {
      console.log(`Correct! You guessed it in ${attempts} attempts.`);
      guessedCorrectly = true;
    }
  }

  rl.close();
}

playNumberGuessingGame();
