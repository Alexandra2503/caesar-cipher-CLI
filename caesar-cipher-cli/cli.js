const { pipeline } = require('stream')
const fs = require('fs')
const through2 = require('through2')
const { Command } = require('commander')
const {caesarCipherEncode} = require('./caesarCipherEncode')
const {caesarCipherDecode} = require('./caesarCipherDecode')
const program = new Command();
program.version('0.0.1');
process.stdin.setEncoding('utf8');

let input;
program
  .requiredOption('-s, --shift <shiftValue>', 'a shift')
  .option('-i, --input <inputValue>', 'an input file')
  .option('-o, --output <outputValue>', 'an output file')
  .requiredOption('-a, --cli-action <actionValue>', 'an action encode/decode')
  .parse(process.argv);
  try{
    if(program.opts().cliAction !== 'encode' && program.opts().cliAction !== 'decode') throw new Error('Incorrect action. Input "encoder/decoder"')
    if(program.opts().cliAction === 'encode' && program.opts().shift < 0)  throw new Error('Incorrect shift. Input positive number')
    if(program.opts().cliAction === 'decode' && program.opts().shift > 0)  throw new Error('Incorrect shift. Input negative number')
  
    pipeline(
        (program.opts().input) 
        ? fs.createReadStream(program.opts().input) 
        : process.stdin,
        through2(function(chunk, _, callback){
            this.push(
                (program.opts().cliAction === 'encode') 
                ? caesarCipherEncode(chunk, program.opts().shift)
                : caesarCipherDecode(chunk, program.opts().shift)
            )
            callback();
        }),
        (program.opts().output) 
        ? fs.createWriteStream(program.opts().output, {"flags":"a"}) 
        : process.stdout,
        //process.stderr,
        (err) => {
            if(err){
                console.log('File cannot be accessed! Check paths')
            } else {
                console.log('Success.')
            }
        }
    )
}catch(err){
    console.error(err.message)
}
