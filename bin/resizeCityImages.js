const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const async = require('async');

const base_path = '/Users/fleeon/Desktop/map';

const dst = path.resolve(base_path, 'resized');
fs.mkdirSync(dst);
async.eachSeries(['china', 'japan', 'korea'], (directory, callback) => {
  fs.readdir(path.resolve(base_path, directory), (err, files) => {
    if (err) return console.error(err);
    const src = path.resolve(base_path, directory);
    async.eachSeries(files, (file, callback) => {
      if (!/\.jpg$/i.test(file)) return callback(null);
      console.info(file);
      sharp(path.resolve(src, file))
        .resize(512, 320)
        .min()
        .withoutEnlargement()
        .toFile(path.resolve(dst, file), callback);
    }, callback);
  });
}, (err) => {
  if (err) return console.error(err);
  console.info('done');
});