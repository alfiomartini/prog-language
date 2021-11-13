
const topEnv = Object.create(null);
// initialize topEnv

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
      break;
    case "identifier":
      const id = exprTree.name;
      if (id in env){
        return env[id]
      } else {
        throw new SyntaxError(`identifier ${id} is not defined.`)
      };
    case "apply":
      let {operator, args} = exprTree;
      if (operator.name === "+"){
        return  eval(args[0], env) + eval(args[1], env);
      };
      if (operator.name === "*"){
        return  eval(args[0], env) * eval(args[1], env);
      };
      if (operator.name === "-"){
        return  eval(args[0], env) -  eval(args[1], env);
      };
      if (operator.name === "/"){
        return  eval(args[0], env) / eval(args[1], env);
      };
      if (operator.name === '>'){
        return eval(args[0], env) > eval(args[1], env);
      };
      if (operator.name === '<'){
        return eval(args[0], env) < eval(args[1], env);
      };
      if (operator.name === 'define'){
        env[args[0].name] = eval(args[1], env);
      };
      if (operator.name === 'do'){
        let val;
        for (let arg of args){
          val = eval(arg, env);
        }
        // return val;
      };
      if (operator.name === 'print'){
        let val = eval(args[0], env);
        console.log(val);
        // return val;
      }
      if (operator.name === 'if'){
        if (eval(args[0], env)){
          eval(args[1], env);
        } else {
          eval(args[2], env);
        }
      };
      if (operator.name === 'while'){
        while (eval(args[0], env)){
          eval(args[1], env);
        }
      }
      break;
  }
}


function evalPrg(text){
  try {
    eval(parsePrg(text).expr, topEnv);
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