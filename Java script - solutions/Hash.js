const fs = require('fs');

let lengthArg = process.argv.length;
let codingType = process.argv[lengthArg - 3];
let pathToStr = process.argv[lengthArg - 2];
let pathToSubstring = process.argv[lengthArg - 1];
let time = false;
let collis = false;
let stringCount = -1;
const primeNumber = 2;
let reminder = Math.pow(2, 32);
function Output(str) {
    let color = '\x1b[33m%s\x1b[0m';
    let point = String.fromCharCode(183);
    console.log(color, point, str);
}

let flag = false;
GetHelp(process.argv[2]);

function GetHelp(arg22) {
    if (arg22 === "/?" || arg22 === "-h" || arg22 === "--help")
    {
        flag = true;
        console.log('\x1b[33m%s\x1b[0m', 'Write:', '\"Hash.js\" [keys] [b/h1/h2/h3] string_file substring_file');
        Output("b - brute force");
        Output("h1 - hashes: сумма кодов");
        Output("h2 - hashes: сумма квадратов кодов");
        Output("h3 - hashes: Рабина-Карпа");
        console.log('\x1b[33m%s\x1b[0m', 'Keys:');
        Output('-с - помимо списка вхождений вывести число коллизий (только хэши)');
        Output("-n N, где N - произвольное натуральное число - вывести первые N вхождений;");
        Output("-t - вывести время работы алгоритма.");
    }
}
if (flag) return;

if (lengthArg < 5)
{
    console.log("\x1b[31m", "Error Error Error Error Error Error Error Error");
    console.log(" Invalid numbers of arguments");
    GetHelp("--help");
    return;
}
else if (lengthArg > 5)
{
    for (let i = 0; i < lengthArg - 5; i++)
    {
        if (process.argv[i + 2] === "-t")
            time = true;
        else if (process.argv[i + 2] === "-c")
            collis = true;
        else if (process.argv[i + 2] === "-n")
        {
            let num = Number(process.argv[i + 3]);
            if (num > 0) {
                stringCount = num;
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
            GetHelp("--help");
            return;
        }
    }
}

if (!fs.existsSync(pathToStr) || !fs.existsSync(pathToSubstring))
{
    return fs.existsSync(pathToStr)
        ? console.log("$(pathTostr) file does not exist!")
        : console.log("$(pathToSubstring) file may not exist - BAN!");
}

let str = fs.readFileSync(pathToStr, 'utf8');
let substr = fs.readFileSync(pathToSubstring, 'utf8');

if (str.length === 0 || substr.length === 0)
{
    console.log("Empty string or substring, BaN");
    return;
}

if (codingType === 'b')
    BrutForce(substr, str);
else if (codingType === 'h1')
    CountHash('h1');
else if (codingType === 'h2')
    CountHash('h2');
else if (codingType === 'h3')
    CountHash('h3');
else
{
    console.error("Wrong codingType");
    GetHelp("--help");
    return;
}

function BrutForce(substr, str) {
    let occurCount = 0;
    if(time)
        console.time(`Operating time of ${codingType}`);

    for (let i = 0; i < str.length - substr.length; i++)
    {
        let j = 0;
        while ((str[i + j] === substr[j]))
        {
            j++;
            if (occurCount !== stringCount) {
                if (j === substr.length) {
                    occurCount++;
                    console.log(i)
                }
            }
            else break;
        }
    }
    if (time)
        console.timeEnd(`Operating time of ${codingType}`);
    if (collis)
        console.log(`No collisions for ${codingType}`)
}

/**
 * @return {number}
 */
function GetHash(str, subLength, typeCode)
{
    let hash = 0;
    for (let i = 0; i < subLength; i++) {
        let code = str[i].charCodeAt(0);
        if (typeCode === "h1")
            hash += code;
        else if (typeCode === "h2")
            hash += code * code;
        else if (typeCode === "h3")
            hash += code * Math.pow(primeNumber, subLength - 1 - i);
    }
    return hash;
}

/**
 * @return {boolean}
 */

function CountHash(type)
{
    let occurrencesCount = 0;
    let collisionsCount = 0;
    if (time)
        console.time(`Operating time of ${codingType}`);
    let strLength = str.length;
    let subLength = substr.length;
    let substrHash = 0;
    let strHash = 0;

    if (type === "h1") {
        substrHash = GetHash(substr, subLength, type);
        strHash = GetHash(str, subLength, type);
    }
    else if (type === "h2") {
        substrHash = GetHash(substr, subLength, type);
        strHash = GetHash(str, subLength, type);
    }
    else if (type === "h3") {
        substrHash = GetHash(substr, subLength,type) % reminder;
        strHash = GetHash(str, subLength, type) % reminder;
    }

    for (let i = 0; i < strLength - subLength; i++ )
    {
        if (occurrencesCount !== stringCount)
        {
            if (substrHash === strHash)
            {
                if (str.substr(i, subLength) !== substr)
                    collisionsCount++;
                else
                {
                    occurrencesCount++;
                    console.log(i)
                }
            }
            if (type === "h1")
                strHash += str[i + subLength].charCodeAt(0) - str[i].charCodeAt(0);
            if (type === "h2")
                strHash += (str[i + subLength].charCodeAt(0) * str[i + subLength].charCodeAt(0))
                    - (str[i].charCodeAt(0) * str[i].charCodeAt(0));
            if (type === "h3")
                strHash = (primeNumber * strHash - (Math.pow(primeNumber, subLength) * str[i].charCodeAt(0))
                    + str[i + subLength].charCodeAt(0)) % reminder;
        }
        else
            break;
    }
    if (substrHash === strHash && occurrencesCount !== stringCount)
    {
        if(str.substr(strLength - subLength, subLength) !== substr)
            collisionsCount++;
        else
            console.log(strLength - subLength);
    }
    if (time)
        console.timeEnd(`Operating time of ${codingType}`);
    if(collis)
        console.log('Collisions: ' + collisionsCount)
}