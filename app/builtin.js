const fs = require('fs');

const BUILTIN_COMMANDS = Object.freeze({
  "exit": exit,
  "echo": echo,
  "type": type
});

const INVALID_ARGS = -2;
const NOT_FOUND = -1;
const EXIT = 0;
const SUCCESS = 1;

function exit(args) {
  if (args == 0) {
    return EXIT;
  }
  return EXIT;
}

function echo(args) {
  console.log(args);
  return SUCCESS;
}

function type(args) {
  for(key of Object.keys(BUILTIN_COMMANDS)) {
    if(key == args) {
      console.log(`${args} is a shell builtin`);
      return SUCCESS;
    }
  }

  inPATH(args);

  console.log(`${args}: not found`);
  return NOT_FOUND;
}


function inPATH(cmd) {
  const PathLength = PATH.length;
  let currentPath = "";
  let lastSepIndex = 0;

  for(let i = 0; i < PathLength; i++) {
    if(i == PathLength - 1) {
      currentPath = PATH.slice(lastSepIndex);
      isInPathMessage(currentPath, cmd);
    }

    if(ch == ";") {
      currentPath = PATH.slice(lastSepIndex, i);
      lastSepIndex = i+1;
      isInPathMessage(currentPath, cmd);
    }
  }

}

function isInPathMessage(path, cmd) {
  if(fs.existsSync(`${path}/${cmd}`)) {
    console.log(`${cmd} is ${path}/${cmd}`);
    return SUCCESS;
  }
}

module.exports = {
  BUILTIN_COMMANDS,
  INVALID_ARGS,
  NOT_FOUND,
  EXIT,
  SUCCESS
};