const fs = require('fs');
let lengthArg = process.argv.length;
let fileContent = fs.readFileSync(process.argv[lengthArg - 2], 'utf8');
let subStr = fs.readFileSync(process.argv[lengthArg - 1], 'utf8');
let time = false;
let firstCount = -1;
if (lengthArg < 4)
    console.log('Invalid arguments count');
else if (lengthArg > 4) {
    for (let i = 2; i < lengthArg - 2; i++)
    {
        if (process.argv[i] === "-t")
            time = true;
        else if (process.argv[i] === "-n")
        {
            let num = Number(process.argv[i + 1]);
            if (num > 0)
            {
                firstCount = num;
                i++;
            }
            else
            {
                console.log("Error, number has to greater zero and less than count of strings");
                return;
            }
        }
        else
        {
            console.log('Wrong key!');
            return;
        }
    }
}

let entry = [];
let entriesArr = [];
let count = 0;

function Bmuuur() {
    for (let i = 0; i < subStr.length; i++)
        entriesArr[subStr[i]] = i;
    for (let i = 0; i < fileContent.length; i++) {
        if (entriesArr[fileContent[i + subStr.length - 1]] !== undefined) {
            i += subStr.length - entriesArr[fileContent[i + subStr.length - 1]] - 1;
            if (fileContent.substr(i, subStr.length) === subStr && count !== firstCount) {
                entry.push(i);
                count++;
            }
        }
        else
            i += subStr.length - 1;
    }
}
if (time)
    console.time(`Operating time`);
Bmuuur();
console.log(entry.join(' '));
if (time)
    console.timeEnd(`Operating time`);
