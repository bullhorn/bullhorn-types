'use strict';
const fs = require('fs');
const packageLock = fs.readFileSync('./package-lock.json');
const usesInternalRepo = /"resolved": "(?!https:\/\/registry.npmjs.org)/i.test(packageLock);
if (usesInternalRepo) {
    const FgBlack = "\x1b[30m";
    const BgRed = "\x1b[41m";
    const Reset = "\x1b[0m";
    console.log(`${FgBlack}${BgRed}`, 'package-lock.json was created using an internal repo', Reset);
    process.exit(1);
}
process.exit(0);
