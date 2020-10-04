const { action } = require("commander");

const caesarCipherDecode = (chunk, shift) => {
    const ascii = {
        firstUppercaseLetterCode: 65, 
        lastUppercaseLetterCode: 90, 
        firstLowercaseLetterCode: 97, 
        lastLowercaseLetterCode: 122, 
        
    }
    let res = '';
    let output;
    for ( let i = 0; i < chunk.length; i++){
        output = chunk[i] - +shift
        if (chunk[i] >= ascii.firstLowercaseLetterCode 
            && chunk[i] <= ascii.lastLowercaseLetterCode) {
                if(output < ascii.firstLowercaseLetterCode) {
                    res += String.fromCharCode(output - ascii.firstLowercaseLetterCode + ascii.lastLowercaseLetterCode + 1)
                } else res += String.fromCharCode(output)
            console.log( chunk[i] + '\t' + output + '\t' + res + '\n');
        } else if (chunk[i] >= ascii.firstUppercaseLetterCode 
                && chunk[i] <= ascii.lastUppercaseLetterCode) {
                    if(output < ascii.firstUppercaseLetterCode) {
                        res += String.fromCharCode(output - ascii.firstUppercaseLetterCode + ascii.lastUppercaseLetterCode + 1)
                    } else res += String.fromCharCode(output)
                console.log( chunk[i] + '\t' + output + '\t' + res + '\n');
        }
    }
    console.log('Result: ' + res)
    return res
} 

module.exports.caesarCipherDecode = caesarCipherDecode;
