{
    // file system

    // asynchronous 

    const fs = require('fs');

    fs.writeFile('./fs.txt', 'new data entry', { encoding: 'utf-8' }, (err) => {
        if (err) {
            console.log('err writing', err)
        }
        console.log('successfully write file')
    })

    fs.readFile('./fs.txt', { encoding: "utf-8" }, (err, data) => {
        if (err) {
            console.log('something wrong :', err)
        };
        console.log(data)
    });


}