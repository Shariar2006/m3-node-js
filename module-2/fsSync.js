{
// file system

// synchronous

const fs = require('fs');

const text = 'learning file system'

// write file 
fs.writeFileSync('./fs.txt', text)

// read file 
const data = fs.readFileSync('./fs.txt', { encoding: "utf-8"})

console.log(data);
}