import { programs } from "../examples/examples.js";
import { parsePrg } from "../parser/parser.js";

const topEnv = Object.create(null);
// initialize topEnv

for (let op of ["+", "-", "*", "/", "<", ">", "<=", ">="]) {
  topEnv[op] = new Function("x, y", `return x ${op} y;`);
}

const reservedOps = {
  define: (args, env) => {
    if (args.length !== 2) {
      throw new SyntaxError('Wrong number of arguments to "define"');
    } else env[args[0].name] = evalExp(args[1], env);
  },
  do: (args, env) => {
    for (let arg of args) {
      evalExp(arg, env);
    }
  },
  if: (args, env) => {
    if (args.length !== 3) {
      throw new SyntaxError('Wrong number of arguments to "if"');
    } else if (evalExp(args[0], env)) {
      evalExp(args[1], env);
    } else {
      evalExp(args[2], env);
    }
  },
  while: (args, env) => {
    if (args.length !== 2) {
      throw new SyntaxError('Wrong number of arguments to "while"');
    } else
      while (evalExp(args[0], env)) {
        evalExp(args[1], env);
      }
  },
  print: (args, env) => {
    if (args.length !== 1) {
      throw new SyntaxError('Wrong number of arguments to "print"');
    } else {
      const val = evalExp(args[0], env);
      console.log(val);
    }
  },
};

// env is an object see as a Map
function evalExp(exprTree, env) {
  switch (exprTree.type) {
    case "string":
      return exprTree.value;
    case "number":
      return parseFloat(exprTree.value);
    case "identifier":
      const id = exprTree.name;
      if (id in env) {
        return env[id];
      } else {
        throw new SyntaxError(`identifier ${id} is not defined.`);
      }
    case "apply":
      let { operator, args } = exprTree;
      if (operator.name in reservedOps) {
        return reservedOps[operator.name](args, env);
      } else {
        // it must be an operation in the topScope environment
        // look up function bound to operator.name
        const op = evalExp(operator, env);
        if (typeof op === "function") {
          const argsArray = args.map((arg) => evalExp(arg, env));
          // apply function to arguments
          return op(...argsArray);
        } else {
          throw new SyntaxError(`Function ${operator.name} is undefined`);
        }
      }
  }
}

function evalPrg(text) {
  try {
    // building local environment on top of global scope (topEnv)
    let val = evalExp(parsePrg(text).expr, Object.create(topEnv));
    // console.log(val);
  } catch (error) {
    console.log(error.message);
  }
}

const runAll = () => {
  for (let prg of programs) {
    evalPrg(prg);
  }
};

window.runAll = runAll;
