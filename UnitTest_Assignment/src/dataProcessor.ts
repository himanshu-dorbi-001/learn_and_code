import fs from 'fs';

export class DataProcessor {
  public inputFilePath: string;
  public outputFilePath: string;
  public recordsProcessed: number;
  public errorCount: number;
  public errorMessages: string[];

  public validateData = true;
  public transformData = true;

  public statistics: Record<string, number>;
  public logFilePath = 'processing.log';

  private rawData: string[];
  public dateFormat = 'yyyy-MM-dd';
  private parsedRecords: Record<string, any>[];
  public batchSize = 100;
  private logBuffer: string[];

  constructor(inputFile: string, outputFile: string) {
    this.inputFilePath = inputFile;
    this.outputFilePath = outputFile;
    this.recordsProcessed = 0;
    this.errorCount = 0;
    this.errorMessages = [];
    this.rawData = [];
    this.parsedRecords = [];
    this.statistics = {};
    this.logBuffer = [];

    if (!fs.existsSync(inputFile)) {
      fs.writeFileSync(inputFile, '', 'utf8');
    }

    this.Log('DataProcessor initialized');
  }

  public ProcessData(): void {
    this.Log('Starting data processing');

    try {
      this.Log(`Reading input file: ${this.inputFilePath}`);
      const fileContent = fs.readFileSync(this.inputFilePath, 'utf8');
      this.rawData = fileContent.split(/\r?\n/);
      this.Log(`Read ${this.rawData.length} lines`);

      this.Log('Parsing data...');
      for (const line of this.rawData) {
        if (!line || !line.trim()) continue;

        const parts = line.split(',');
        if (parts.length >= 3) {
          const record: Record<string, any> = {
            id: parts[0].trim(),
            name: parts[1].trim(),
            value: parts[2].trim(),
          };

          if (parts.length >= 4) {
            record.date = parts[3].trim();
          }

          this.parsedRecords.push(record);
        } else {
          this.errorCount++;
          this.errorMessages.push(`Invalid line format: ${line}`);
          this.Log(`ERROR: Invalid line format: ${line}`);
        }
      }

      this.Log(`Parsed ${this.parsedRecords.length} records`);

      if (this.validateData) {
        this.Log('Validating data...');
        const validRecords: Record<string, any>[] = [];

        for (const record of this.parsedRecords) {
          let isValid = true;

          if (!('id' in record) || !String(record.id).trim()) {
            isValid = false;
            this.errorMessages.push('Record missing ID');
          }

          if (!('name' in record) || !String(record.name).trim()) {
            isValid = false;
            this.errorMessages.push(`Record ${record.id ?? ''} missing name`);
          }

          if ('value' in record) {
            if (Number.isNaN(Number(record.value))) {
              isValid = false;
              this.errorMessages.push(`Record ${record.id ?? ''} has invalid value`);
            }
          }

          if (isValid) {
            validRecords.push(record);
          } else {
            this.errorCount++;
          }
        }

        this.parsedRecords = validRecords;
        this.Log(`Validation complete. ${this.parsedRecords.length} valid records`);
      }

      if (this.transformData) {
        this.Log('Transforming data...');

        for (const record of this.parsedRecords) {
          if ('name' in record) {
            record.name = String(record.name).toUpperCase();
          }

          if ('date' in record) {
            const parsedDate = new Date(String(record.date));
            if (!Number.isNaN(parsedDate.getTime())) {
              record.date = this.formatDate(parsedDate);
            }
          }

          if ('value' in record) {
            const value = Number(record.value);
            record.doubled_value = value * 2;
            record.squared_value = value * value;
          }
        }

        this.Log('Transformation complete');
      }

      this.Log('Calculating statistics...');
      this.statistics.total_records = this.parsedRecords.length;
      this.statistics.error_count = this.errorCount;

      let totalValue = 0;
      for (const record of this.parsedRecords) {
        if ('value' in record) {
          totalValue += Number(record.value);
        }
      }

      this.statistics.total_value = Math.trunc(totalValue);
      this.statistics.average_value = this.parsedRecords.length > 0 ? Math.trunc(totalValue / this.parsedRecords.length) : 0;

      this.Log(`Statistics calculated: ${Object.keys(this.statistics).length} metrics`);

      this.Log(`Writing output to: ${this.outputFilePath}`);
      const outputLines: string[] = [];
      outputLines.push('ID,NAME,VALUE,DATE,DOUBLED_VALUE,SQUARED_VALUE');

      for (const record of this.parsedRecords) {
        const line = `${record.id ?? ''},${record.name ?? ''},${record.value ?? ''},${record.date ?? ''},${record.doubled_value ?? ''},${record.squared_value ?? ''}`;
        outputLines.push(line);
      }

      fs.writeFileSync(this.outputFilePath, outputLines.join('\n'), 'utf8');
      this.recordsProcessed = this.parsedRecords.length;

      this.Log(`Output written. ${this.recordsProcessed} records processed`);
      fs.writeFileSync(this.logFilePath, this.logBuffer.join('\n'), 'utf8');

      console.log('Processing complete!');
      console.log(`Records processed: ${this.recordsProcessed}`);
      console.log(`Errors: ${this.errorCount}`);
    } catch (ex: any) {
      this.errorCount++;
      this.errorMessages.push(`Fatal error: ${ex.message}`);
      this.Log(`FATAL ERROR: ${ex.message}`);
      console.log(`Processing failed: ${ex.message}`);
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (this.dateFormat === 'MM/dd/yyyy') {
      return `${month}/${day}/${year}`;
    }
    return `${year}-${month}-${day}`;
  }

  private Log(message: string): void {
    const timestamp = new Date().toISOString();
    this.logBuffer.push(`[${timestamp}] ${message}`);
  }

  public DisplayStatistics(): void {
    console.log('\n=== Processing Statistics ===');
    for (const key of Object.keys(this.statistics)) {
      console.log(`${key}: ${this.statistics[key]}`);
    }

    if (this.errorMessages.length > 0) {
      console.log('\n=== Errors ===');
      for (const error of this.errorMessages) {
        console.log(`- ${error}`);
      }
    }
  }

  public ExportToJson(jsonFilePath: string): void {
    this.Log(`Exporting to JSON: ${jsonFilePath}`);
    const jsonLines: string[] = ['['];

    for (let i = 0; i < this.parsedRecords.length; i++) {
      const record = this.parsedRecords[i];
      const properties: string[] = [];
      for (const key of Object.keys(record)) {
        properties.push(`"${key}": "${record[key]}"`);
      }
      let jsonObj = `  {${properties.join(', ')}}`;
      if (i < this.parsedRecords.length - 1) {
        jsonObj += ',';
      }
      jsonLines.push(jsonObj);
    }

    jsonLines.push(']');
    fs.writeFileSync(jsonFilePath, jsonLines.join('\n'), 'utf8');
    this.Log('JSON export complete');
  }

  public ExportToXml(xmlFilePath: string): void {
    this.Log(`Exporting to XML: ${xmlFilePath}`);
    const xmlLines: string[] = ['<?xml version="1.0" encoding="UTF-8"?>', '<records>'];

    for (const record of this.parsedRecords) {
      xmlLines.push('  <record>');
      for (const key of Object.keys(record)) {
        xmlLines.push(`    <${key}>${record[key]}</${key}>`);
      }
      xmlLines.push('  </record>');
    }

    xmlLines.push('</records>');
    fs.writeFileSync(xmlFilePath, xmlLines.join('\n'), 'utf8');
    this.Log('XML export complete');
  }

  public ExportByFormat(filePath: string, format: string): void {
    switch (format.toLowerCase()) {
      case 'json':
        this.ExportToJson(filePath);
        break;
      case 'xml':
        this.ExportToXml(filePath);
        break;
      case 'csv':
        fs.writeFileSync(filePath, 'ID,NAME,VALUE', 'utf8');
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  public FilterByValue(minValue: number): Record<string, any>[] {
    const filtered: Record<string, any>[] = [];
    for (const record of this.parsedRecords) {
      if ('value' in record) {
        const value = Number(record.value);
        if (value >= minValue) {
          filtered.push(record);
        }
      }
    }

    this.Log(`Filtered ${filtered.length} records with value >= ${minValue}`);
    return filtered;
  }

  public UpdateConfiguration(dateFormatNew: string, batchSizeNew: number, validate: boolean, transform: boolean): void {
    this.dateFormat = dateFormatNew;
    this.batchSize = batchSizeNew;
    this.validateData = validate;
    this.transformData = transform;
    this.Log(`Configuration updated: dateFormat=${this.dateFormat}, batchSize=${this.batchSize}`);
  }

  public static GenerateSampleData(filePath: string, recordCount: number): void {
    const lines: string[] = [];
    for (let i = 1; i <= recordCount; i++) {
      const id = `ID${String(i).padStart(4, '0')}`;
      const name = `Item${i}`;
      const value = Math.floor(Math.random() * 991) + 10;
      const date = new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      lines.push(`${id},${name},${value},${dateString}`);
    }
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Generated ${recordCount} sample records in ${filePath}`);
  }
}
