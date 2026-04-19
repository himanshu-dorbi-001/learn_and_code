import { GeocodingError } from '../error/errors';
import { GeocodeLocation } from '../model/geocodeLocation';

interface GoogleGeocodeResponse {
  status: string;
  error_message?: string;
  results: Array<{
    place_id: string;
    formatted_address: string;
    geometry: { location: { lat: number; lng: number } };
  }>;
}

export class GoogleGeocodeService {
  private readonly baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private readonly apiKey: string) {}

  async geocode(locationName: string): Promise<GeocodeLocation[]> {
    const encodedQuery = encodeURIComponent(locationName);
    const url = `${this.baseUrl}?address=${encodedQuery}&key=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new GeocodingError(`Geocoding request failed with status ${response.status}.`);
    }

    const body = (await response.json()) as GoogleGeocodeResponse;
    if (body.status !== 'OK') {
      const message = body.error_message ?? `Geocoding service returned status ${body.status}.`;
      throw new GeocodingError(message);
    }

    if (!body.results.length) {
      throw new GeocodingError('Geocoding service returned no results.');
    }

    return body.results.map((result) => ({
      placeId: result.place_id,
      formattedAddress: result.formatted_address,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
    }));
  }
}
