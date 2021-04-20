const priority = { "**": 3, "*": 2, "/": 2, "+": 1, "-": 1, "(": 0, ")": 0};
const operators = {
    "**": (x, y) => Math.pow(y, x),
    "*": (x, y) => y * x,
    "/": (x, y) => y / x,
    "+": (x, y) => y + x,
    "-": (x, y) => y - x
};
let input = [];
let stack = [];
let resultArr = [];
let resultString = "";

for (let i = 2; i < process.argv.length; i++)
    input[i - 2] = process.argv[i];

for (let i = 0; i < input.length; i++)
{
    if (input[i] === "(")
    {
        stack.push(input[i]);
        continue;
    }
    if (input[i] === ")")
    {
        while (stack[stack.length - 1] !== "(")
            resultArr.push(stack.pop());
        stack.pop();
        continue;
    }
    if (!(input[i] in priority))  //number
        resultArr.push(input[i]);
    else
        if (stack.length === 0)
            stack.push(input[i]);
        else
            if (priority[input[i]] > priority[stack[stack.length - 1]])
                stack.push(input[i]);
            else
            {
                while (stack.length !== 0)
                {
                    if (stack[stack.length - 1] === "(")
                        break;
                    resultArr.push(stack.pop());
                }
                stack.push(input[i]);
            }
}

resultArr.push(stack.pop());

for (let i = 0; i < resultArr.length; i++)
    resultString += resultArr[i] + " ";

for (let i = 0; i < resultArr.length; i++)
    if (!(resultArr[i] in operators))
        stack.push(resultArr[i]);
    else
    {
        let x = Number(stack.pop());
        let y = Number(stack.pop());
        stack.push(operators[resultArr[i]](x, y))
    }
console.log(resultString);
console.log(stack.pop());
