const fs = require('fs');
let fileContent = fs.readFileSync('/Users/dns/Documents/in.txt', 'utf8'); 
let frequencySymbols = new Array();
let lastSymbol = new Array();//символ, добавленный на k-ом шаге
let alphabet = "";
let codeSymbol = new Array();
let str = new Array(); //входная строка
for (let i = 0 ; i < fileContent.length; i++)
{
	if (alphabet.indexOf(fileContent[i]) != -1)
		frequencySymbols[fileContent.charAt(i)]++;
	else
	{
		alphabet += fileContent[i];
		frequencySymbols[fileContent.charAt(i)]=1;
		codeSymbol[fileContent.charAt[i]]='';
	}
	
}

console.log("Alphabet and frequency:");

