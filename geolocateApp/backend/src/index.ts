import { Config } from './config';
import { GoogleGeocodeService } from './service/googleGeocodeService';
import { InputValidator } from './service/validator';
import { ConsoleApp } from './controller/consoleApp';
import { ConsoleUi } from '../../frontend/consoleUi';

async function bootstrap(): Promise<void> {
  const config = Config.load();
  const geocodeService = new GoogleGeocodeService(config.googleApiKey);
  const validator = new InputValidator();
  const consoleUi = new ConsoleUi();
  const consoleApp = new ConsoleApp(geocodeService, validator, consoleUi);
  const locationArgument = process.argv.slice(2).join(' ').trim() || undefined;

  try {
    await consoleApp.run(locationArgument);
  } catch (error) {
    consoleUi.showError(error);
    process.exitCode = 1;
  }
}

bootstrap();
