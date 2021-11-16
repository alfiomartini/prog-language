import { programs } from "../examples/examples.js";
import { parsePrg, skipSpaces } from "../parser/parser.js";

const topEnv = Object.create(null);
// initialize topEnv

for (let op of ["+", "-", "*", "/", "<", ">", "<=", ">=", "=="]) {
  topEnv[op] = new Function("x, y", `return x ${op} y;`);
}

topEnv.array = (...args) => {
  const arr = [];
  for (let k = 0; k < args.length; k++) {
    arr.push(args[k]);
  }
  return arr;
};

topEnv.length = (array) => array.length;

topEnv.elem = (array, index) => array[index];

const reservedOps = {
  fun: (args, env) => {
    if (args.length < 1) {
      throw new SyntaxError("A function should have at least a body");
    }
    const body = args[args.length - 1];
    const params = args.slice(0, args.length - 1).map((expr) => {
      if (expr.type !== "identifier") {
        throw new SyntaxError("Parameter names must be words");
      }
      return expr.name;
    });
    return function () {
      if (arguments.length !== params.length) {
        throw new SyntaxError(
          "Number of arguments must match the number of parameters"
        );
      }
      const localEnv = Object.create(env);
      for (let k = 0; k < params.length; k++) {
        localEnv[params[k]] = arguments[k];
      }
      return evalExp(body, localEnv);
    };
  },
  set: (args, env) => {
    if (args.length !== 2) {
      throw new SyntaxError('Wrong number of arguments to "set"');
    }
    const identifier = args[0].name;
    let currEnv = env;
    while (!Object.hasOwnProperty.call(currEnv, identifier)) {
      // go up in the prototype chain
      currEnv = Object.getPrototypeOf(currEnv);
      //  we have not found a definition for 'property'
      if (currEnv === null) {
        throw new ReferenceError(
          `Reference error: Identifier ${identifier} is not defined.`
        );
      }
    }
    // evaluate 'val' in the original environment
    let val = evalExp(args[1], env);
    // update identifier in the correct environment with 'val'
    currEnv[identifier] = val;
    // testing
    return evalExp(identifier, env);
  },
  define: (args, env) => {
    if (args.length !== 2) {
      throw new SyntaxError('Wrong number of arguments to "define"');
    }
    let val = evalExp(args[1], env);
    const identifier = args[0].name;
    // if identifier is already defined, it becomes a new
    // binding, shadowing the previous binding
    env[identifier] = val;
    return evalExp(args[0], env);
    // return val;
  },
  do: (args, env) => {
    let val;
    for (let arg of args) {
      val = evalExp(arg, env);
    }
    return val;
  },
  if: (args, env) => {
    if (args.length !== 3) {
      throw new SyntaxError('Wrong number of arguments to "if"');
    } else if (evalExp(args[0], env) === true) {
      return evalExp(args[1], env);
    } else {
      return evalExp(args[2], env);
    }
  },
  while: (args, env) => {
    let val;
    if (args.length !== 2) {
      throw new SyntaxError('Wrong number of arguments to "while"');
    } else {
      while (evalExp(args[0], env) === true) {
        val = evalExp(args[1], env);
      }
      return val;
    }
  },
  print: (args, env) => {
    if (args.length !== 1) {
      throw new SyntaxError('Wrong number of arguments to "print"');
    } else {
      const val = evalExp(args[0], env);
      console.log(val);
      return val;
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
      }
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

function evalPrg(text) {
  try {
    // building local environment on top of global scope (topEnv)
    let val = evalExp(parsePrg(text).expr, Object.create(topEnv));
    return val;
    // console.log(val);
  } catch (error) {
    console.log(error.message);
  }
}

const runAll = () => {
  for (let prg of programs) {
    let val = evalPrg(prg);
    // console.log(val);
  }
};

window.runAll = runAll;
window.parsePrg = parsePrg;
window.skipSpaces = skipSpaces;
window.programs = programs;
window.evalPrg = evalPrg;
window.topEnv = topEnv;
window.evalExp = evalExp;
