# GeolocateApp TypeScript

A clean, SOLID TypeScript starter application that looks up latitude and longitude using the Google Geocoding API.

## Features

- Reads `GOOGLE_API_KEY` from `.env`
- Validates location input
- Handles multiple geocoding results
- Displays structured output in console mode
- Uses separation of concerns and proper naming conventions

## Setup

1. Install dependencies

```bash
cd geolocateApp/backend
npm install
```

2. Copy `.env.example` to `.env` if you want to replace the sample key.

```bash
copy ..\.env.example .env
```

3. Run the console application

```bash
npm run console
```

Then enter the location when prompted.

## Notes

- The app uses `dotenv` for configuration.
- The console mode prompts for input if no location is provided as an argument.
