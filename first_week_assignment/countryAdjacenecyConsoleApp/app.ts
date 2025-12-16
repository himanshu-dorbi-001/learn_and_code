import * as readline from 'readline';
import { getAdjacentCountries } from './adjacenecyMap';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startApplication(): void {
  rl.question('Enter Country Code (e.g. IN / US / NZ): ', (inputCode) => {
    const adjacentCountries = getAdjacentCountries(inputCode.trim());

    if (!adjacentCountries) {
      console.log('Invalid country code or no data available.');
    } else if (adjacentCountries.length === 0) {
      console.log('No adjacent countries found.');
    } else {
      console.log('Adjacent Countries:');
      adjacentCountries.forEach(country => console.log(`- ${country}`));
    }

    rl.close();
  });
}

startApplication();