const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let answer = "";

function waitForUserInput() {
  return new Promise((resolve) => {
    rl.question("$ ", (input) => {
      resolve(input)
    });
  });
}

async function main() {
  while(true) {

    answer = await waitForUserInput();

    if(answer == "exit 0") {
      rl.close();
      break;
    }

    console.log(`${answer}: command not found`);
  }
}

main();