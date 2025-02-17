const fs = require('fs');
const PATH = process.env.PATH;

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

  if(inPATH(args) == SUCCESS) {
    return SUCCESS;
  }

  console.log(`${args}: not found`);
  return NOT_FOUND;
}


function inPATH(cmd) {
  const PathLength = PATH.length;
  let response = NOT_FOUND;
  let currentPath = "";
  let lastSepIndex = 0;

  for(let i = 0; i < PathLength; i++) {
    if(i == PathLength - 1) {
      currentPath = PATH.slice(lastSepIndex);
      response = isInPathMessage(currentPath, cmd);
    }

    if(PATH[i] == ":") {
      currentPath = PATH.slice(lastSepIndex, i);
      lastSepIndex = i+1;
      response = isInPathMessage(currentPath, cmd);
    }

    if(response == SUCCESS) {
      return SUCCESS;
    }
  }

}

function isInPathMessage(path, cmd) {
  if(!path.endsWith("/")) {
    path = path.concat("/"); // If path doesn't have / at the end, adds it.
  }

  if(fs.existsSync(`${path}${cmd}`)) {
    console.log(`${cmd} is ${path}${cmd}`);
    return SUCCESS;
  }

  return NOT_FOUND;
}

module.exports = {
  BUILTIN_COMMANDS,
  INVALID_ARGS,
  NOT_FOUND,
  EXIT,
  SUCCESS
};