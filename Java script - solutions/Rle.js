const fs = require('fs');
let str = "";
let str1 = "";
let arg2 = process.argv[2];//Code or Decode
let arg3 = process.argv[3];//Escape or Jump
let arg4 = process.argv[4];//file from
let arg5 = process.argv[5];//file to
if (arg2 == "/?")
{
	console.log('Write code/decode, escape/jump, file from/file to');
	return;
}
else if (arg2 == null)
	return;
if (!fs.existsSync(arg4))
{
	console.log("Erroor, file doesn't exist");
	return;
}
let fileContent = fs.readFileSync(arg4, 'utf8');    
//
if (arg2 == 'Code' && arg3 == 'Escape')
	fs.writeFileSync(arg5, Code(fileContent, str));
else if (arg2 == 'Decode' && arg3 == 'Escape')
	fs.writeFileSync(arg5, Decode(fileContent, str1));
else if (arg2 == 'Code' && arg3 == 'Jump')
	fs.writeFileSync(arg5, CodeJump(fileContent, str));
else if (arg2 == 'Decode' && arg3 == 'Jump')
	fs.writeFileSync(arg5, DecodeJump(fileContent, str1));
else
	console.error("error, wrong coding names");

function Code(fileContent, str)
{
	for (let i = 0; i < fileContent.length; i++)
	{
		let x = i;
		let underStrLength = 1;
		let count = 0;
		while (i+1 <= fileContent.length && fileContent[i + 1] == fileContent[i])
			{
				if(underStrLength == 255) 
					break;
				++underStrLength;
				i++;
			}
			
		if (fileContent[x] == '#' && underStrLength <= 3)
			str += "#" + String.fromCodePoint(underStrLength) + "#";
		else if (underStrLength >= 1 && underStrLength <= 3)
		{
			for (let k = 0;k < underStrLength;++k)
				str += fileContent[x];
		}	
		else if (underStrLength > 3)
			str += "#" + String.fromCodePoint(underStrLength) + fileContent[x];
	}
	return str; 		
}

function Decode(fileContent, str1)
{
	for (let i = 0; i < fileContent.length; i++)
	{
		if (fileContent[i] == '#')
		{
			for (let j = 0; j < fileContent.charCodeAt(i+1); j++)
				str1 += fileContent[i+2];
			i += 2;
		}
		else
			str1 += fileContent[i];
	}
	return str1;
}

function CodeJump(fileContent, str) {
    let i = 0;
    let j = 1;
    while (i < fileContent.length) {
        if (fileContent[i] == fileContent[i + 1]) {
            while (fileContent[i] === fileContent[i + j] && j < 127)
                j++;
            str += (String.fromCharCode(j) + fileContent[i]);
        }
        else {
            while (fileContent[i + j] !== fileContent[i + j + 1] && fileContent[i + j - 1] !== fileContent[i + j] && j < 127)
                j++;
            str += (String.fromCharCode(j + 128) + fileContent.substr(i, j));
        }
        i += j;
        j = 1;
    }
    return str;
}



function DecodeJump(fileContent, str1)
{
	let str3="";
	let i = 0;
	let symbCode = 0;
	while(i < fileContent.length)
	{
        if (fileContent[i].charCodeAt() < 128)
        {
            symbCode = fileContent[i].charCodeAt();
            for (let j = 0; j < symbCode; j++)
                str1 += fileContent[i + 1];
            i++;
        }
        else
        {
            let length = fileContent[i].charCodeAt() - 128;
            for (let j = 0; j < length; j++)
            {
                str1 += fileContent[i + 1];
                i++;
            }
        }
		i++;
	}
	return str1;
}
/*

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
let entriesArr = new Map();
let count = 0;

function Bm() {
    console.time(`Operating time of an algorithm`);

    for (let i = 0; i < subStr.length; i++)
        entriesArr.set(subStr[i], i);
    console.log(entriesArr);
    for (let i = 0; i < fileContent.length; i++) {
        if (entriesArr.has(fileContent[i + subStr.length - 1])) {
            i += subStr.length - entriesArr.get(fileContent[i + subStr.length - 1]) - 1;
            if (fileContent.substr(i, subStr.length) === subStr && count !== firstCount) {
                entry.push(i);
                count++;
            }
        }
        else
            i += subStr.length - 1;
        console.log(i);
    }
}
if (time)
    console.time(`Operating time`);
Bm();
console.log(entry.join(' '));
if (time)
    console.timeEnd(`Operating time`);

 */