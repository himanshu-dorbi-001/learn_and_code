import { GoogleGeocodeService } from '../service/googleGeocodeService';
import { InputValidator } from '../service/validator';
import { ConsoleUi } from '../../../frontend/consoleUi';

export class ConsoleApp {
  constructor(
    private readonly geocodeService: GoogleGeocodeService,
    private readonly inputValidator: InputValidator,
    private readonly consoleUi: ConsoleUi
  ) {}

  async run(locationArgument?: string): Promise<void> {
    const locationName = locationArgument?.trim() || (await this.consoleUi.requestLocation());
    const validatedLocation = this.inputValidator.validateLocationName(locationName);
    const results = await this.geocodeService.geocode(validatedLocation);

    this.consoleUi.showResults(validatedLocation, results);
  }
}
