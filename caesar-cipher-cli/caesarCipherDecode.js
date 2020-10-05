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
        output = chunk[i] - (+shift * ( -1 ))
        if (chunk[i] >= ascii.firstLowercaseLetterCode 
            && chunk[i] <= ascii.lastLowercaseLetterCode) {
                if(output < ascii.firstLowercaseLetterCode) {
                    res += String.fromCharCode(output - ascii.firstLowercaseLetterCode + ascii.lastLowercaseLetterCode + 1)
                } else res += String.fromCharCode(output)
        } else if (chunk[i] >= ascii.firstUppercaseLetterCode 
                && chunk[i] <= ascii.lastUppercaseLetterCode) {
                    if(output < ascii.firstUppercaseLetterCode) {
                        res += String.fromCharCode(output - ascii.firstUppercaseLetterCode + ascii.lastUppercaseLetterCode + 1)
                    } else res += String.fromCharCode(output)
        } else res += String.fromCharCode(chunk[i])
    }
    return res
} 

module.exports.caesarCipherDecode = caesarCipherDecode;
