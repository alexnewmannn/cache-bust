const crypto = require('crypto');
const fs = require('fs');
const cbDebug = require('debug')('cache-bust:debug');

const generateHash = (dir, sourceFile) => {
  const file = fs.readFileSync((`${dir}${sourceFile}`), 'utf8');
  const hash = crypto
    .createHash('sha1')
    .update(file, 'utf8')
    .digest('hex');

  const removeExtension = sourceFile.split('.js');
  const splitFile = removeExtension[0].split('/');
  const fileName = splitFile.pop();
  const destination = sourceFile.replace(fileName, `${fileName}-${hash}`);
  cbDebug(`${dir}${sourceFile}`, `${dir}${destination}`);
  fs.copyFile(`${dir}${sourceFile}`, `${dir}${destination}`, (copyErr) => {
    if (copyErr) {
      throw copyErr;
    }
  });

  return destination;
};

const createHashFile = (dir, sources) => {
  const hashes = sources.map(file => (
    {
      [file]: generateHash(dir, file),
    }
  ));

  return Object.assign({}, ...hashes.map(item => (
    { [Object.keys(item)[0]]: item[Object.keys(item)[0]] }
  )));
};

module.exports = createHashFile;
