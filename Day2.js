const fs = require('fs');
const path = require('path');

function writeToFile(filePath, content) {
    const absolutePath = path.join(__dirname, filePath);

    fs.writeFile(absolutePath, content, 'utf8', (err) => {
        if (err) {
            console.error(`Error writing to file: ${err.message}`);
        } else {
            console.log(`Data written to ${filePath}`);
        }
    });
}

// Test Cases
writeToFile('output.txt', 'Content in a non-existent folder.');
