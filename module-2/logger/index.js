const path = require('path');
const fs = require('fs');

const inputArgument = process.argv.slice(2);

const message = inputArgument.join(' ');
const text = `${message} \n`
console.log(text)

if (!text) {
    console.log('❌ please provide a message ❌')
    process.exit(1)
}

const filePath = path.join(__dirname, 'log.txt')

fs.appendFile(filePath, text, () => {
    console.log('successfully append your data')
})