const fs = require('fs');
let str = "";
let str1 = "";
let arg2 = process.argv[2];//code or decode
let arg3 = process.argv[3];//escape or jump
let arg4 = process.argv[4];//file from
let arg5 = process.argv[5];//file to
let fileContent = fs.readFileSync('/Users/dns/Documents/' + arg4, 'utf8');  
//fs.writeFileSync('/Users/dns/Documents/' + arg5, Code(fileContent, str).length / fileContent.length); - коэфф. сжатия
if (arg2 == 'Code' && arg3 == 'Escape')
	fs.writeFileSync('/Users/dns/Documents/' + arg5, Code(fileContent, str));
if (arg2 == 'Decode' && arg3 == 'Escape')
	fs.writeFileSync('/Users/dns/Documents/' + arg5, Decode(fileContent, str1));
if (arg2 == 'Code' && arg3 == 'Jump')
	fs.writeFileSync('/Users/dns/Documents/' + arg5, CodeJump(fileContent, str));
if (arg2 == 'Decode' && arg3 == 'Jump')
	fs.writeFileSync('/Users/dns/Documents/' + arg5, DecodeJump(fileContent, str));
function Code(fileContent, str)
{
	for (let i = 0;i < fileContent.length; i++)
	{
		let x = i;
		let underStrLength = 1;
		while (i+1 <= fileContent.length && fileContent[i + 1] == fileContent[i])
			{
				if(underStrLength == 255) 
					break;
				++underStrLength;
				i++;
			}
		if (fileContent[x + 1] != fileContent[x] && fileContent[x] == "#")
			str += "#1#";
		else if (underStrLength >= 1 && underStrLength <= 3)
		{
			for(let k = 0;k < underStrLength;++k)
				str += fileContent[x];
		}	
		else if (underStrLength > 3 && underStrLength <= 255 )
			str += "#" + String.fromCodePoint(underStrLength) + fileContent[x];
	}
	return str; 		//+ "\n" + "Коэффицинт сжатия: " + (str.length / fileContent.length);
}

function Decode(fileContent, str1)
{
	for (let i = 0; i < fileContent.length; i++)
	{
		if (fileContent[i] == '#' && fileContent.substr(i, 3) != '#1#')
		{
			for (let j = 0; j < fileContent.charCodeAt(fileContent[i+1]); j++)
				str1 += fileContent[i+2];
			i += 2;
		}
		else if (fileContent.substr(i, 3) == '#1#')
		{
			str1 += "#";
			i += 2;
		}
	}
	return str1;
}
/*
function CodeJump(fileContent, str)
{
	for(let i = 0; i < fileContent.length; i++)
	{
		
	}
}

function DecodeJump(fileContent, str)
{
	for(let i = 0; i < fileContent.length; i++)
	{
		
	}
}
*/
/*if (fileContent.substr(i, 2) == '#\/'
			{
				for (let j = 0; j < parseInt(fileContent.substr(i+2, 1)); j++)
					str1 = str1 + fileContent.substr(i+3, 1);
			i += 3;
			}
			else if (parseInt(fileContent.substr(i+1, 3)) >= 128)
			{
				for (let l = 0; l < parseInt(fileContent.substr(i+1, 3)); l++)
					str1 = str1 + fileContent.substr(i+4, 1);			
			i += 4;
			}
			else if (fileContent.charCodeAt(i+1,1)<= 127 && fileContent.charCodeAt(i+1,1) >= 32)
			{
				for (let k = 0; k < fileContent.charCodeAt(i+1, 1); k++)
					str1 = str1 + fileContent.substr(i+2, 1);			
			i += 2;
			}
			*/