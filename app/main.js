const builtins = require("./builtin.js")
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function waitUserInput() {
  return new Promise((resolve) => {
    rl.question("$ ", (input) => {
      resolve(input)
    });
  });
}

function checkCommand(input) {
  input = input.trim();

  const whitespaceIndex = input.indexOf(" ");
  const cmd = whitespaceIndex == -1 ? input : input.slice(0, input.indexOf(" ")).trim();
  const args = whitespaceIndex == -1 ? "" : input.slice(input.indexOf(" ")+1);

  if(args == ""){
    console.log(`${cmd}: command not found`);
    return builtins.NOT_FOUND;
  }

  for(key of Object.keys(builtins.BUILTIN_COMMANDS)) {
    const func = builtins.BUILTIN_COMMANDS[key];

    if(cmd == key) {
      return func(args.trim());
    }
  }

  console.log(`${cmd}: command not found`);
  return builtins.NOT_FOUND;
}

async function main() {
  let answer = "";
  let response = 1;
  while(true) {
    
    answer = await waitUserInput();

    response = checkCommand(answer);

    if(response == builtins.EXIT) {
      rl.close();
      break;
    }
  }
}

main();