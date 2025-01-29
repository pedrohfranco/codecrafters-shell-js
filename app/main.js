const builtins = require("./utils/builtin.js");
const exec = require('./programExec.js');
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function waitUserInput() {
  return new Promise((resolve) => {
    rl.question("$ ", (input) => {
      resolve(input);
    });
  });
}

function processInput(input) {
  input = input.trim();
  const whitespaceIndex = input.indexOf(" ");

  return {
    cmd: whitespaceIndex == -1 ? input : input.slice(0, input.indexOf(" ")).trim(),
    args: whitespaceIndex == -1 ? "" : input.slice(input.indexOf(" ")+1).trim()
  };
}

function checkCommand(cmd, args) {
  if(args == ""){
    console.log(`${cmd}: command not found`);
    return builtins.NOT_FOUND;
  }

  for(key of Object.keys(builtins.BUILTIN_COMMANDS)) {
    const func = builtins.BUILTIN_COMMANDS[key];

    if(cmd == key) {
      return func(args);
    }
  }

  if(builtins.inPATH(cmd) == builtins.SUCCESS) {
    return builtins.EXTERNAL_PROGRAM;
  }

  console.log(`${cmd}: command not found`);
  return builtins.NOT_FOUND;
}

async function main() {
  let input = null;
  let response = builtins.SUCCESS;

  while(true) {
    
    input = await waitUserInput();
    const Answer = processInput(input);

    response = checkCommand(Answer.cmd, Answer.args);

    if(response == builtins.EXTERNAL_PROGRAM) {
      exec.execProgram(Answer.cmd, Answer.args);
    }

    if(response == builtins.EXIT) {
      rl.close();
      break;
    }
  }
}

main();