const lockfile = require('proper-lockfile');
const Promise = require('bluebird');
const fs = require('fs-extra');
const crypto = require('crypto'); // random buffer contents

const retryOptions = {
    retries: {
        retries: 5,
        factor: 3,
        minTimeout: 1 * 1000,
        maxTimeout: 60 * 1000,
        randomize: true,
    }
};

let file;
let cleanup;
Promise.try(() => {
    file = '/var/tmp/file.txt';
    return fs.ensureFile(file); // fs-extra creates file if needed
}).then(() => {
    return lockfile.lock(file, retryOptions);
}).then(release => {
    cleanup = release;

    let buffer = crypto.randomBytes(4);
    let stream = fs.createWriteStream(file, {flags: 'a', encoding: 'binary'});
    stream.write(buffer);
    stream.end();

    return new Promise(function (resolve, reject) {
        stream.on('finish', () => resolve());
        stream.on('error', (err) => reject(err));
    });
}).then(() => {
    console.log('Finished!');
}).catch((err) => {
    console.error(err);
}).finally(() => {
    cleanup && cleanup();
});
