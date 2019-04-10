const crypto = require('crypto');
const fs = require('fs');

const generateHash = (sourceFile) => {
  const file = fs.readFileSync((`.${sourceFile}`), 'utf8');
  const hash = crypto
    .createHash('sha1')
    .update(file, 'utf8')
    .digest('hex');

  const removeExtension = sourceFile.split('.js');
  const splitFile = removeExtension[0].split('/');
  const fileName = splitFile.pop();
  const destination = sourceFile.replace(fileName, `${fileName}-${hash}`);

  return destination;
};

const createHashFile = (sources) => {
  const hashes = sources.map(file => (
    {
      [file]: generateHash(file),
    }
  ));

  return Object.assign({}, ...hashes.map(item => (
    { [Object.keys(item)[0]]: item[Object.keys(item)[0]] }
  )));
};

module.exports = createHashFile;
