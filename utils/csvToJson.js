import fs from 'fs';
import path from 'path';
import csv from 'csvtojson';

const inputFile = path.resolve('testdata/test.csv');
const outputFile = path.resolve('testdata/test.json');

async function convert() {
  try {
    const rows = await csv().fromFile(inputFile);

    // Convert array → single object
    const result = {};

    rows.forEach(row => {
      const key = row.Name?.trim();
      const value = row.Value?.trim();

      if (key) {
        result[key] = value;
      }
    });

    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

    console.log('CSV converted to key-value JSON successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

convert();