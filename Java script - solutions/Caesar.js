const fs = require('fs');
const en = "abcdefghijklmnopqrstuvwxyz"
const rus = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя"
const RusFreq =
    {
        'а' : 0.080129951,
        'б' : 0.0159356724,
        'в' : 0.045383383,
        'г' : 0.0169507261,
        'д' : 0.0297904325,
        'е' : 0.0844924082,
        'ё' : 0.0003660007,
        'ж' : 0.0093948692,
        'з' : 0.0164861478,
        'и' : 0.0735317227,
        'й' : 0.0120852219,
        'к' : 0.034938902,
        'л' : 0.0439968978,
        'м' : 0.0320683219,
        'н' : 0.0669722958,
        'о' : 0.109673692,
        'п' : 0.0281070725,
        'р' : 0.0473350368,
        'с' : 0.054678117,
        'т' : 0.0625827124,
        'у' : 0.0262152801,
        'ф' : 0.0026436466,
        'х' : 0.0097061107,
        'ц' : 0.0048267702,
        'ч' : 0.014448193,
        'ш' : 0.0072807824,
        'щ' : 0.0036069574,
        'ъ' : 0.0003670377,
        'ы' : 0.0189918277,
        'ь' : 0.0173860861,
        'э' : 0.0031866468,
        'ю' : 0.0063742852,
        'я' : 0.0200667924
    };

const EngFreq =
    {
        'a' : 0.08167 ,
        'b' : 0.01492 ,
        'c' : 0.02782 ,
        'd' : 0.04253 ,
        'e' : 0.12702 ,
        'f' : 0.02228 ,
        'g' : 0.02015 ,
        'h' : 0.06094 ,
        'i' : 0.06966 ,
        'j' : 0.00153 ,
        'k' : 0.00772 ,
        'l' : 0.04025 ,
        'm' : 0.02406 ,
        'n' : 0.06749 ,
        'o' : 0.07507 ,
        'p' : 0.01929 ,
        'q' : 0.00095 ,
        'r' : 0.05987 ,
        's' : 0.06327 ,
        't' : 0.09056 ,
        'u' : 0.02758 ,
        'v' : 0.00978 ,
        'w' : 0.0236 ,
        'x' : 0.0015 ,
        'y' : 0.01974 ,
        'z' : 0.00074 ,
    }

let codingType = process.argv[2];// code or decode
let fileFrom = process.argv[3];
let fileTo = process.argv[4];
let shift;
let language;// rus or en
if (process.argv.length === 7) {
    shift = process.argv[5];
    if (process.argv[6] === "en")
        language = en;
    else if (process.argv[6] === 'rus')
        language = rus;
    else
    {
        console.log('Invalid language name');
        return;
    }
}
else if (process.argv.length === 6) {
    if (process.argv[5] === "en")
        language = en;
    else if (process.argv[5] === 'rus')
        language = rus;
    else
    {
        console.log('Invalid language name');
        return;
    }
}
else {
    console.log("Invalid arguments count");
    return;
}

let fileContent = fs.readFileSync(fileFrom, 'utf8');
if (!fs.existsSync(fileFrom))
{
    console.log("Error, invalid arguments, file doesn't exist");
    return;
}

if (fileFrom.length === 0 || fileTo.length === 0)
{
    console.log("Empty string or substring, BaN");
    return;
}

if (codingType === "code")
    fs.writeFileSync(fileTo, Code(fileContent, shift, language));
else if (codingType === "decode")
    fs.writeFileSync(fileTo, Decode(fileContent, language));
else
    console.log("Invalid arguments, write code or decode");
//console.log(en);

/**
 * @return {string}
 */
function Code(fileContent, shift, language)
{
    let alphabet = language.split('');
    let reminder = language.length;
    shift = shift % reminder;
    let text = fs.readFileSync(fileFrom).toString().split('\r\n').join('').toLowerCase().split('');
    for (let i = 0; i < text.length; i++)
    {
        let c = text[i];
        let index = alphabet.indexOf(c);
        if (index < 0)
           text[i] = c.toString();
        else
        {
            let codeIndex = (index + shift)%alphabet.length;
            text[i] = alphabet[codeIndex];
        }
    }
    return text.join('');
}

/**
 * @return {string}
 */
function Decode(fileContent, language) {
    let frequency = FrequencyAnalysis(fileContent, language);
    let ethalonFreq = GetFreqDict(frequency, language);
    let shift = Number(FindShift(ethalonFreq, language));
    console.log(shift);
    return(Code(fileContent, shift, language));
}

function FrequencyAnalysis(fileContent)
{
    let res = {};
    let count = 0;
    for(let i = 0; i < fileContent.length; i++)
    {
        if(language.indexOf(fileContent[i]) === -1)
            continue;
        if(fileContent[i] in res)
            res[fileContent[i]]++;
        else
            res[fileContent[i]] = 1;
        count++
    }
    for(let key in res)
        res[key] = Number((res[key] / count).toFixed(5));
    return res
}


function GetFreqDict(freq, language)
{
    let alphabet = language === rus ? RusFreq : EngFreq;
    let res = {};
    for(let key in freq)
    {
        let minFreq = 1000;
        for(let letter in alphabet)
            if(Math.abs(freq[key] - alphabet[letter]) < minFreq)
            {
                res[key] = letter.toLowerCase();
                minFreq = Math.abs(freq[key] - alphabet[letter])
            }
    }
    return res
}

/**
 * @return {number}
 */
function FindShift(obj, alphabet)
{
    let res = {};
    for(let key in obj)
    {
        let currentShift = GetDifferenceBetweenLetters(key, obj[key], alphabet);
        if(currentShift in res)
            res[currentShift]++;
        else
            res[currentShift] = 1
    }
    return FindMaxInObj(res);
}

/**
 * @return {number}
 */
function GetDifferenceBetweenLetters(letter1, letter2, language)
{
    return (language === rus)
        ? (language.indexOf(letter2) - language.indexOf(letter1) + 33) % 33
        : (language.indexOf(letter2) - language.indexOf(letter1) + 26) % 26
}

/**
 * @return {number}
 */
function FindMaxInObj(shifts)
{
    let max = -1;
    let maxKey = 0;
    for(let key in shifts)
        if(shifts[key] > max)
        {
            max = shifts[key];
            maxKey = key
        }
    return maxKey;
}
