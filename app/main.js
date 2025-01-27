const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Uncomment this block to pass the first stage

rl.question("$ ", (answer) => {
    if(answer == "exit 0") {
      rl.close();
    }
    console.log(`${answer}: command not found`);
    rl.close();
});
