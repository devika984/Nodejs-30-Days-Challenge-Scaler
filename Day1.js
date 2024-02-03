const fs = require('fs');
const path = require('path');

function readFileContent(filePath) {
    const absolutePath = path.join(__dirname, filePath);

    fs.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
        } else {
            console.log('File Content:');
            console.log(data);
        }
    });
}

readFileContent('file1.txt');
