const fs = require('fs');
let str = "";
let str1 = "";

let arg2 = process.argv[2];//code or decode
let arg3 = process.argv[3];//file from
let arg4 = process.argv[4];//code table path to
let arg5 = process.argv[5];//file to

if (arg2 == "/?")
{
	console.log('Write code/decode, file from, table path to, file to');
	return;
}

if (!fs.existsSync(arg3))
{
	console.log("Error, write arguments");
	return;
}

let fileContent = fs.readFileSync(arg3, 'utf8');

console.log(fs.readFileSync(arg3, 'utf8'));

if (arg2 == 'code')
	fs.writeFileSync(arg5, codeSymb(fileContent, str));
else if (arg2 == 'decode')
	fs.writeFileSync(arg5, DecodeSymb(fileContent, str1));

function codeSymb(fileContent, str)
{
	let frequencySymbols = new Array();//частота символа
	let alphabet = ""; //алфавит 
	let codeSymbol = new Array();// код символа
	let nSymb = new Array(); // символ на n-ном шаге
	for (let i = 0 ; i < fileContent.length; i++)
	{
		if (alphabet.indexOf(fileContent[i]) != -1)
			frequencySymbols[fileContent.charAt(i)]++;
		else
		{
			alphabet += fileContent[i];
			frequencySymbols[fileContent[i]]=1;
			codeSymbol[fileContent.charAt(i)]='';
		}
	}

	for (let i = 0; i < alphabet.length; i++)
		console.log(alphabet.charAt(i) + ":" + frequencySymbols[alphabet.charAt(i)]);
	//Начинаем строительство дерева 
	let tree = alphabet.split('');
	let copyTree = tree; //Изменяемая копия дерева 
	while (tree.length > 1) 
	{ 
		for (let i = tree.length - 1; i >= 0; i--)
			for (let j = 0; j <= i; j++) 
			{ //Сортируем по частоте
				if (frequencySymbols[tree[j]] > frequencySymbols[tree[j+1]]) 
				{
					let temp = copyTree[j];
					copyTree[j] = copyTree[j+1];
					copyTree[j+1] = temp;
				}
			}	
		frequencySymbols[copyTree[1] + copyTree[0]] = frequencySymbols[copyTree[1]] + frequencySymbols[copyTree[0]]; //Склеиваем самые неповторяющиеся листики Березки
		frequencySymbols.splice(copyTree[0], 1);
		frequencySymbols.splice(copyTree[1], 1); //УДАЛИТЬ символ
		copyTree[0] += copyTree[1];
		nSymb = nSymb.concat(copyTree.splice(1,1)); //удалить существующие элементы		
		//Метод concat() возвращает новый массив, состоящий из массива, на котором он был вызван,
		//соединённого с другими массивами и/или значениями, переданными в качестве аргументов.
		tree = copyTree;
	}
	console.log(nSymb);
	tree = alphabet; //Восполянем алфавит
	if (tree.length == 1) 
	codeSymbol[tree.charAt(0)] = '0';
	while (tree.length > 1)
	{ //Заполняем коды символов
		index = nSymb[nSymb.length - 1];
		codeSymbol[index] += '0';
		let generation = new RegExp('[' + index  + ']');//создаем регулярное выражение «на лету» из динамически сгенерированной строки
		tree = tree.replace(generation, ""); //Удаляем символ, код которого уже сгенерирован
		for (let j = 0; j < tree.length; j++)
			codeSymbol[tree.charAt(j)] += '1';
		nSymb.pop(); //удаляет последний элемент из массива и возвращает его значение.
	}
	fs.writeFileSync(arg5, fileContent.length + " ");
	console.log("Коды символов:");
	let str2 = "";
	for (let i = 0; i < alphabet.length; i++)
	{
		str2 += alphabet.charAt(i) + ":" + codeSymbol[alphabet.charAt(i)] + " ";
		console.log(alphabet.charAt(i) + ':' + codeSymbol[alphabet.charAt(i)]);
	}
	fs.writeFileSync(arg4, str2); //Выводим алфавит с кодами
	for (let i = 0; i < fileContent.length; i++) 
	{
		for (let j=0; j < fileContent[i].length; j++)
		{			//Создаем строку вывода
			str += codeSymbol[fileContent[i].charAt(j)] + " ";
		}
	}
	return str;
	
}

function DecodeSymb(fileContent, str1)
{
	let codeSymb = new Array(); 
	let tableCode = fs.readFileSync(arg4, 'utf8');
	let codeWords = fileContent.split(' ');
	let wordAndCode = tableCode.split(' ');
	
	
	for (let i = 0; i < wordAndCode.length - 1; i++) 
	{
		let underStr = wordAndCode[i][0] + wordAndCode[i][1];
		codeSymbs = wordAndCode[i].replace(underStr, "");
		let newAlf = new DecodeSymbol(wordAndCode[i][0], codeSymbs);
		codeSymb.push(newAlf);
	}

	for (let j = 0; j < codeWords.length - 1; j++)
		for (let i = 0; i < codeSymb.length; i++)
			if (codeWords[j] == codeSymb[i].letterCode)
				str1 += codeSymb[i].letter;
	console.log(str1);
	return str1;
}
 

function DecodeSymbol(letter, letterCode)
{
this.letter = letter;
this.letterCode = letterCode;
}