"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleUi = void 0;
const promises_1 = __importDefault(require("readline/promises"));
class ConsoleUi {
    async requestLocation() {
        const terminal = promises_1.default.createInterface({ input: process.stdin, output: process.stdout });
        const answer = await terminal.question('Enter a location name: ');
        await terminal.close();
        return answer;
    }
    showResults(locationName, results) {
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
    showError(error) {
        if (error instanceof Error) {
            console.error(`Application error: ${error.message}`);
            return;
        }
        console.error('Application error: An unknown error occurred.');
    }
}
exports.ConsoleUi = ConsoleUi;
//# sourceMappingURL=consoleUi.js.map