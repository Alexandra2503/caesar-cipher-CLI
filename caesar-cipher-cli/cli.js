const { pipeline } = require('stream')
const fs = require('fs')
const through2 = require('through2')
const { Command } = require('commander')
const {caesarCipherEncode} = require('./caesarCipherEncode')
const {caesarCipherDecode} = require('./caesarCipherDecode')
const program = new Command();
program.version('0.0.1');
let codeStr;
program
  .requiredOption('-s, --shift <shiftValue>', 'a shift')
  .option('-i, --input <inputValue>', 'an input file')
  .option('-o, --output <outputValue>', 'an output file')
  .requiredOption('-a, --cli-action <actionValue>', 'an action encode/decode')
  .parse(process.argv);

pipeline(
    fs.createReadStream(program.opts().input),
    through2(function(chunk, _, callback){
        this.push(
            (program.opts().cliAction === 'encode') 
            ? caesarCipherEncode(chunk, program.opts().shift)
            : caesarCipherDecode(chunk, program.opts().shift)
        )
        callback();
    }),
    fs.createWriteStream(program.opts().output),
    (err) => {
        if(err){
            console.log(err)
        }
    }
)
