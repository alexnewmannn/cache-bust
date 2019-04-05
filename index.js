const crypto = require('crypto')
const fs = require('fs');
const glob = require('glob');

const checksum = () => {
  const source = './static/assets/js/*.js';
  const destination = './static/assets/js/cached';
  if (fs.existsSync(destination)) {
    console.log('path exists!');
  } else {
    fs.mkdirSync(destination);
  }
  const test = glob(source, (err, matches) => {
    matches.forEach((fileMatch) => {
      const file = fs.readFileSync((fileMatch), 'utf8');
      const hash = crypto
        .createHash('sha1')
        .update(file, 'utf8')
        .digest('hex');
      console.log(hash, 'hash');
      const splitFile = fileMatch.split('/');
      const fileName = splitFile.pop();
      console.log(fileName)
      fs.copyFile(fileMatch, `${destination}/${fileName}-${hash}.js`, (copyErr) => {
        if (copyErr) {
          throw copyErr;
        }
        console.log(`${fileMatch} was copied to ${fileName}-${hash}.js`);
      });
    });
  });
};

module.exports = checksum();
