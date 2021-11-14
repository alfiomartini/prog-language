
const topEnv = Object.create(null);
// initialize topEnv

const reservedOps = {
  'define':(args, env) => {
    env[args[0].name] = eval(args[1], env);
  },
  'do':(args, env) => {
    for (let arg of args){
      eval(arg, env);
    }
  },
  'if':(args, env) => {
    if (eval(args[0], env)){
      eval(args[1], env);
    } else {
      eval(args[2], env);
    }
  },
  'while':(args, env) => {
    while (eval(args[0], env)){
      eval(args[1], env);
    }
  },
  'print':(args, env) => {
    const val = eval(args[0], env);
    console.log(val);
  }
};

for (let op of ['+','-','*','/', '<','>', '<=','>=']){
  topEnv[op] =  new Function("x, y", `return x ${op} y;`);
}

// env is a map
function eval(exprTree, env){
  switch (exprTree.type) {
    case "string":
      return exprTree.value;
    case "number":
      return parseFloat(exprTree.value);
    case "identifier":
      const id = exprTree.name;
      if (id in env){
        return env[id]
      } else {
        throw new SyntaxError(`identifier ${id} is not defined.`)
      };
    case "apply":
      let {operator, args} = exprTree;
      if (operator.name in reservedOps){
        return reservedOps[operator.name](args, env);
      }
      else {
        // it must be an operation in the topScope environment
        // look up function bound to operator.name
        const op = eval(operator, env);
        if (typeof op === 'function'){
          const argsArray =  args.map(arg => eval(arg, env));
          // apply function to arguments
          return op(...argsArray);
        } else {
          throw new SyntaxError(`Function ${operator.name} is undefined`);
        }
      }
  }
}


function evalPrg(text){
  try {
    let val = eval(parsePrg(text).expr, Object.create(topEnv));
    // console.log(val);
  } 
  catch (error){
   console.log(error.message);
  }
}

const runAll = () => {
  for (let prg of programs){
    evalPrg(prg);
  }
}