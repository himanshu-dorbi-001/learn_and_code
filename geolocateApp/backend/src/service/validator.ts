import { ValidationError } from '../error/errors';

export class InputValidator {
  private static readonly minimumLength = 3;

  validateLocationName(locationName: string): string {
    const trimmedLocation = locationName.trim();

    if (!trimmedLocation) {
      throw new ValidationError('Location name is required.');
    }

    if (trimmedLocation.length < InputValidator.minimumLength) {
      throw new ValidationError(`Location name must be at least ${InputValidator.minimumLength} characters.`);
    }

    return trimmedLocation;
  }
}
