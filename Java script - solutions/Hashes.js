const fs = require("fs");
let i = 2;
let keys = [];
while (process.argv[i]) {
    keys.push(process.argv[i])
    i++;
}
console.log(keys);
if (fs.existsSync(process.argv[keys.length]) && fs.existsSync(process.argv[keys.length + 1])) {
    let string = fs.readFileSync(process.argv[keys.length], "utf-8");
    let substring = fs.readFileSync(process.argv[keys.length + 1], "utf-8");
    let N = Number.MAX_VALUE;
    let timeKey = false;
    let collision = false;
    let countInput = [];
    var h1 = false;
    var h2 = false;
    var h3 = false;
    for (let i = 0; i < keys.length - 2; i++) {
        switch (keys[i]) {
            case "-t":
                timeKey = true;
                break;
            case "-n":
                N = keys[i + 1];
                i++;
                break;
            case "-c":
                collision = true;
                break;
            case "b":
                countInput = BruteForce(string, substring, N);
                console.log(countInput);
                break;
            case "h1":
                h1 = true;
                countInput = Hash(string, substring, N)
                console.log(countInput);
                break;
            case "h2":
                h2 = true;
                countInput = Hash(string, substring, N)
                console.log(countInput);
                break;
            case "h3":
                h3 = true;
                countInput = Hash(string, substring, N)
                console.log(countInput);
                break;
        }
    }

    function BruteForce(string, substring, N) {
        let time = Date.now();
        let input = [];
        let i = 0,
            j = 0,
            n = 0;
        while (i < string.length - substring.length + 1 && n < N) {
            j = 0;
            while (substring[j] == string[j + i]) {
                j++;
                if (j == substring.length) {
                    input.push(i);
                    n++;
                    break;
                }
            }
            i++;
        }
        time = Date.now() - time;
        if (timeKey) console.log("time perfomanve code", time);
        return input;
    }
    var st2 = 1;

    function Hash(string, substring, N) {
        let time = Date.now();
        let n = 0;
        let result = [];
        let j = 0;
        let collisionCount = 0;
        let curSum = 0;
        let subSum = 0;
        let st2 = 1;
        if (h1 == true) {
            let temp = CountBeginHashSum(string, substring, subSum, curSum);
            curSum = temp.curSum;
            subSum = temp.subSum;
        }
        if (h2 == true) {
            let temp = CountBeginHashSquare(string, substring, subSum, curSum);
            curSum = temp.curSum;
            subSum = temp.subSum;
        }
        if (h3 == true) {
            let temp = CountBeginHashRab(string, substring, subSum, curSum, st2);
            curSum = temp.curSum;
            subSum = temp.subSum;
            st2 = temp.st2;
        }
        console.log(curSum, subSum);
        let i = 0;
        while (i < string.length - substring.length + 1 && n < N) {
            if (curSum == subSum) {
                j = 0;
                result.push(i);
                n++;
                while (substring[j] == string[j + i] && j < substring.length) {
                    j++;
                }
                if (j != substring.length) {
                    collisionCount++;
                }
            }
            i++;
            if (i <= string.length - substring.length) {
                if (h1 == true)
                    curSum = CountHashSum(string, substring, i, curSum);
                if (h2 == true)
                    curSum = CountHashSquare(string, substring, i, curSum);
                if (h3 == true)
                    curSum = CountHashRab(string, substring, i, curSum, st2);
            }
        }
        time = Date.now() - time;
        if (timeKey == true) { console.log("time perfomanve code", time); }
        if (collision)
            console.log("Collision", collisionCount);
        return result;
    }

    function CountBeginHashSum(string, substring, subSum, curSum) {
        for (let i = 0; i < substring.length; i++) {
            subSum += substring.charCodeAt(i);
            curSum += string.charCodeAt(i);
        }
        return { curSum, subSum };
    }

    function CountBeginHashSquare(string, substring, curSum, subSum) {
        for (let i = 0; i < substring.length; i++) {
            subSum += Math.pow(substring.charCodeAt(i), 2);
            curSum += Math.pow(string.charCodeAt(i), 2);
        }
        return { curSum, subSum };
    }

    function CountBeginHashRab(string, substring, curSum, subSum, st2) {
        for (let k = substring.length - 1; k >= 0; k--) {
            curSum += string.charCodeAt(k) * st2;
            subSum += substring.charCodeAt(k) * st2;
            st2 *= 2;
        }
        st2 /= 2;
        return { curSum, subSum, st2 };
    }

    function CountHashSum(string, substring, i, curSum) {
        return curSum = curSum - string.charCodeAt(i - 1) + string.charCodeAt(i + substring.length - 1);

    }

    function CountHashSquare(string, substring, i, curSum) {
        return curSum = curSum - Math.pow(string.charCodeAt(i - 1), 2) + Math.pow(string.charCodeAt(i + substring.length - 1), 2)
            ;}