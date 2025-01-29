const cprocess = require('child_process');
const builtins = require("./utils/builtin.js");

function findProgram(cmd) {
  if(builtins.inPATH(cmd) == builtins.SUCCESS) {
    return cmd;
  }

  return builtins.NOT_FOUND;
}

function getProgramName(path) {
  for(let i = path.length - 1; i >= 0; i--) {
    if(path[i] == "/") {
      return path.slice(i + 1);
    }
  }
}

function execProgram(cmd, args) {
    const path = cmd;
    if(findProgram(cmd) == builtins.NOT_FOUND) {
      reject(builtins.NOT_FOUND);
    }

    cprocess.execFileSync(path, args.split(" "), {encoding: 'utf-8', stdio: 'inherit'});
}

module.exports = {
  execProgram
};
