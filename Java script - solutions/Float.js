const fs = require('fs');
const plusZero = '0 00000000 000000000000000000000000';
const NotNumber = '0 11111111 10000000000000000000000';
const minusZero = '1 00000000 000000000000000000000000';
const plusInfinity = '0 11111111 000000000000000000000000';
const minusInfinity = '1 11111111 000000000000000000000000';
let result = "";

if (process.argv.length === 3)
{
    let number = Number(process.argv[2]);
    result = Convert(number);
    if (result === "Infitiny")
        return;
    console.log('Internal: ' + result);
}
else
    console.log("Invalid arguments");
/**
 * @return {string}
 */
function Convert(number)
{
    if (number > (2 - 2 ** -23) * 2 ** 127)
    {
        console.log(`plusInfinity: ${plusInfinity}`);
        return "Infitiny";
    }
    if (number < -(2 - 2 ** -23) * 2 ** 127)
    {
        console.log(`minusInfinity: ${minusInfinity}`);
        return "-Inf";
    }
    switch (number)
    {
        case '0':
            console.log('Number: 0');
            return plusZero;
        case '-0':
            console.log('Number: -0');
            return minusZero;
        default:
             if (Number.isNaN(Number(number)))
             {
                    console.log("Argument is not a number");
                    return NotNumber;
             }
            break;
    }
    return GetNumber(number);
}

/**
 * @return {string}
 */
function GetNumber(number)
{
    let octothorpe = '';
    if (number >= 0)
        octothorpe = '+';
    else
        octothorpe = '-';
    number = Math.abs(number);
    let realBinaryExponent = [];
    let binaryNumber = parseFloat(number).toString(2); //Переводим в двоичную систему
    let pointPosition = binaryNumber.indexOf('.');
    let onePosition = binaryNumber.indexOf('1');
    let exponent = 0;
    let mantissa = '';
    if (pointPosition === -1)
        pointPosition = binaryNumber.length;
    if (pointPosition > onePosition)
    {
        exponent = pointPosition - 1 + 127;
        mantissa = binaryNumber.substring(1, pointPosition) + binaryNumber.substring(pointPosition + 1);
    }
    else
    {
        exponent = pointPosition - onePosition + 127;
        mantissa = binaryNumber.substring(onePosition + 1);
    }

    let binaryExponent = parseFloat(exponent).toString(2);

    for (let i = 0; i < 8; i++)
    {
        if (binaryExponent.charAt(binaryExponent.length - i - 1) === '')
            realBinaryExponent[7 - i] = 0;
        else
            realBinaryExponent[7 - i] = binaryExponent[binaryExponent.length - i - 1];
    }

    realBinaryExponent  = realBinaryExponent.join('');
    return GetInternalNumber(mantissa, octothorpe, realBinaryExponent, number);
}
/**
 * @return {string}
 */
function GetInternalNumber(mantissa, octothorpe, realBinaryExponent, number)
{
    let internalNumber = [];
    let count0 = 0;
    for (let i = 0; i < 34; i++)
        internalNumber[i] = 0;
    if (octothorpe === '+')
        internalNumber[0] = 0;
    else
        internalNumber[0] = 1;
    internalNumber[1] = ' ';
    if (number < 2 ** -126) {
        count0 = -126 - realBinaryExponent - 1;
        for (let i = 9; i > 1; i--)
            internalNumber[i] = 0;
    }

    else {
        for (let i = 9; i > 1; i--)
            if (realBinaryExponent[i - 2] === '')
                internalNumber[i] = 0;
            else
                internalNumber[i] = realBinaryExponent[i - 2];
    }
    console.log(realBinaryExponent);
    console.log(count0);
    internalNumber[10] = ' ';
    for (let i = 11; i < 34 && i < mantissa.length + 11; i++)
    {
        if (count0 !== 0) {
            internalNumber[i] = 0;
            count0--;
            continue;
        }
        internalNumber[i] = mantissa[i - 11];
    }
    return internalNumber.join('');
}