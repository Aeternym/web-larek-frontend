const { cpSync } = require('node:fs');
const path = require('node:path');

cpSync(path.resolve(__dirname, '../src/public'), path.resolve(__dirname, '../dist'), {
  recursive: true,
});
