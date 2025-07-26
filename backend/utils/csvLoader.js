const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

function loadCSV(filename) {
  return new Promise((resolve, reject) => {
    const results = [];
    const filepath = path.join(__dirname, '../data', filename);
    fs.createReadStream(filepath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', reject);
  });
}

module.exports = { loadCSV };
