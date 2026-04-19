import fs from 'fs';
import path from 'path';
import { DataProcessor } from '../src/dataProcessor';

describe('DataProcessor TypeScript translation', () => {
  const tempDir = path.join(__dirname, 'temp');
  const inputFile = path.join(tempDir, 'input.csv');
  const outputFile = path.join(tempDir, 'output.csv');
  const jsonFile = path.join(tempDir, 'output.json');
  const xmlFile = path.join(tempDir, 'output.xml');
  const csvFile = path.join(tempDir, 'output.csv2');

  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(() => {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test('ProcessData reads, validates, transforms, exports and records stats', () => {
    const lines = ['1,Apple,10,2025-01-01', '2,Banana,5', '3,,bad'];
    fs.writeFileSync(inputFile, lines.join('\n'), 'utf8');

    const processor = new DataProcessor(inputFile, outputFile);
    processor.ProcessData();

    expect(processor.recordsProcessed).toBe(2);
    expect(processor.errorCount).toBe(1);
    expect(processor.errorMessages).toContain('Record 3 missing name');
    expect(processor.errorMessages).toContain('Record 3 has invalid value');

    const output = fs.readFileSync(outputFile, 'utf8');
    expect(output).toContain('ID,NAME,VALUE,DATE,DOUBLED_VALUE,SQUARED_VALUE');
    expect(output).toContain('1,APPLE,10,2025-01-01,20,100');
    expect(output).toContain('2,BANANA,5,,10,25');
    expect(processor.statistics.total_records).toBe(2);
    expect(processor.statistics.error_count).toBe(1);
  });

  test('ExportToJson and ExportToXml create valid files', () => {
    const processor = new DataProcessor(inputFile, outputFile);
    processor.ProcessData();
    processor.ExportToJson(jsonFile);
    processor.ExportToXml(xmlFile);

    expect(fs.existsSync(jsonFile)).toBe(true);
    expect(fs.existsSync(xmlFile)).toBe(true);

    const jsonContent = fs.readFileSync(jsonFile, 'utf8');
    expect(jsonContent).toContain('"id": "1"');
    expect(jsonContent).toContain('"name": "APPLE"');

    const xmlContent = fs.readFileSync(xmlFile, 'utf8');
    expect(xmlContent).toContain('<records>');
    expect(xmlContent).toContain('<id>1</id>');
  });

  test('ExportByFormat supports json, xml, and csv', () => {
    const processor = new DataProcessor(inputFile, outputFile);
    processor.ProcessData();
    processor.ExportByFormat(csvFile, 'csv');

    const csvContent = fs.readFileSync(csvFile, 'utf8');
    expect(csvContent).toBe('ID,NAME,VALUE');
  });

  test('FilterByValue returns only matching records', () => {
    const processor = new DataProcessor(inputFile, outputFile);
    processor.ProcessData();
    const filtered = processor.FilterByValue(10);
    expect(filtered.every((record) => Number(record.value) >= 10)).toBe(true);
  });

  test('UpdateConfiguration changes processor options', () => {
    const processor = new DataProcessor(inputFile, outputFile);
    processor.UpdateConfiguration('MM/dd/yyyy', 50, true, true);
    expect(processor.dateFormat).toBe('MM/dd/yyyy');
    expect(processor.batchSize).toBe(50);
    expect(processor.validateData).toBe(true);
    expect(processor.transformData).toBe(true);
  });

  test('GenerateSampleData creates sample CSV file', () => {
    const samplePath = path.join(tempDir, 'sample.csv');
    DataProcessor.GenerateSampleData(samplePath, 5);
    expect(fs.existsSync(samplePath)).toBe(true);
    const content = fs.readFileSync(samplePath, 'utf8');
    expect(content.split('\n').length).toBe(5);
  });
});
