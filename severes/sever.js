

const fs = require('fs')
const https = require('https')

const readfile = fs.readfileSync('text.txt','utf-8')
console.log(readfile);
