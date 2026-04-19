import readline from 'readline/promises';
import { GeocodeLocation } from '../backend/src/model/geocodeLocation';

export class ConsoleUi {
  async requestLocation(): Promise<string> {
    const terminal = readline.createInterface({ input: process.stdin, output: process.stdout });
    const answer = await terminal.question('Enter a location name: ');
    await terminal.close();
    return answer;
  }

  showResults(locationName: string, results: GeocodeLocation[]): void {
    const header = `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${locationName}"`;
    const details = results.map((result, index) => [
      `Result ${index + 1}:`,
      `  Address: ${result.formattedAddress}`,
      `  Place ID: ${result.placeId}`,
      `  Latitude: ${result.latitude.toFixed(6)}`,
      `  Longitude: ${result.longitude.toFixed(6)}`,
    ].join('\n'));

    console.log([header, ...details].join('\n\n'));
  }

  showError(error: unknown): void {
    if (error instanceof Error) {
      console.error(`Application error: ${error.message}`);
      return;
    }

    console.error('Application error: An unknown error occurred.');
  }
}
