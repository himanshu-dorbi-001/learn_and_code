import { GeocodeLocation } from '../model/geocodeLocation';

export class OutputFormatter {
  static formatLocation(location: GeocodeLocation, index: number): string {
    return [
      `Result ${index + 1}:`,
      `  Address: ${location.formattedAddress}`,
      `  Place ID: ${location.placeId}`,
      `  Latitude: ${location.latitude.toFixed(6)}`,
      `  Longitude: ${location.longitude.toFixed(6)}`,
    ].join('\n');
  }

  static formatResults(locationName: string, results: GeocodeLocation[]): string {
    const header = `Found ${results.length} result${results.length === 1 ? '' : 's'} for "${locationName}"`;
    const details = results.map((result, index) => OutputFormatter.formatLocation(result, index));
    return [header, ...details].join('\n\n');
  }
}
