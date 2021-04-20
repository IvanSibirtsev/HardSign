const fs = require('fs');

let lengthArg = process.argv.length;
let pathToStr = process.argv[lengthArg - 2];
let pathToSubstring = process.argv[lengthArg - 1];
let time = false;
let table = false;
let firstCount = -1;

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
        console.log('\x1b[33m%s\x1b[0m', 'Write:', 'Path to:\"Automatic.js\" [keys] string_file substring_file');
        console.log('\x1b[33m%s\x1b[0m', 'Keys:');
        Output('-a - помимо списка вхождений вывести таблицу автомата');
        Output("-n N, где N - произвольное натуральное число - вывести первые N вхождений;");
        Output("-t - вывести время работы алгоритма.");
    }
}
if (flag) return;

if (lengthArg < 4)
{
    console.log("\x1b[31m", "Error Error Error Error Error Error Error Error");
    console.log(" Invalid numbers of arguments");
    GetHelp("--help");
    return;
}
else if (lengthArg > 4)
{
    for (let i = 0; i < lengthArg - 4; i++)
    {
        if (process.argv[i + 2] === "-t")
            time = true;
        else if (process.argv[i + 2] === "-a")
            table = true;
        else if (process.argv[i + 2] === "-n")
        {
            let num = Number(process.argv[i + 3]);
            if (num > 0) {
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

let occurCount = 0;

let res = new Automatic(str, substr);
for (let i = 0; i <str.length; i++) {
    if (res.change(str.charAt(i)) && occurCount !== firstCount) {
        console.log(`${occurCount}: ` + (i - substr.length + 1));
        occurCount++;
    }
}
function Automatic(str, substr) {
    if(time)
        console.time(`Operating time`);
    let state = 0;
    let substrlength = substr.length;
    let alphabet = [];
//Определяем алфавит строки str - Σ
    for (let i = 0;i < substrlength; i++)
        alphabet[substr.charAt(i)] = 0;
//В двумерном массиве tableS будем хранить таблицу переходов
    let tableS = new Array(substrlength + 1);
    for (let j = 0; j <= substrlength; j++)
        tableS[j] = [];
//Инициализируем таблицу переходов
    for (let i in alphabet)
        tableS[0][i]=0;
//Формируем таблицу переходов
    for (let j = 0; j < substrlength; j++){
        let temp = tableS[j][substr.charAt(j)];
        tableS[j][substr.charAt(j)]=j+1;
        for (let i in alphabet)
            tableS[j+1][i]=tableS[temp][i];
    }
//Выводим таблицу переходов
    if (table) {
        console.log('Table: ');
        for (let j = 0; j <= substrlength; j++) {
            let out = '';
            for (let i in alphabet)
                out += tableS[j][i] + ' ';
            console.log(`${j}: ` + out);
        }
        console.log('Indexes:');
    }

    this.change = function (symbol) {
        state = (tableS[state][symbol] == null) ? 0 : tableS[state][symbol];
        return (state === substrlength);
    };
    if (time)
        console.timeEnd(`Operating time`);
}
/*

 */