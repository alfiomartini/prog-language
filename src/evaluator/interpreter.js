// global definitions
// const symbolTable = new Map();


const start = () => {
  // now symbol table is local to each program evaluation
  const symbolTable = new Map();
  return function eval(exprTree){
    switch (exprTree.type) {
      case "string":
        return exprTree.value;
      case "number":
        return parseFloat(exprTree.value);
        break;
      case "identifier":
        const id = exprTree.value;
        if (symbolTable.has(id)){
          return symbolTable.get(id)
        } else {
          throw new SyntaxError(`identifier ${id} is not defined.`)
        };
      case "apply":
        let {expr, args} = exprTree;
        if (expr.value === "+"){
          return  eval(args[0]) + eval(args[1]);
        };
        if (expr.value === "*"){
          return  eval(args[0]) * eval(args[1]);
        };
        if (expr.value === "-"){
          return  eval(args[0]) -  eval(args[1]);
        };
        if (expr.value === "/"){
          return  eval(args[0]) / eval(args[1]);
        };
        if (expr.value === '>'){
          return eval(args[0]) > eval(args[1]);
        };
        if (expr.value === '<'){
          return eval(args[0]) < eval(args[1]);
        };
        if (expr.value === 'define'){
          symbolTable.set(args[0].value, eval(args[1]))
        };
        if (expr.value === 'do'){
          for (let arg of args){
            eval(arg);
          }
        };
        if (expr.value === 'print'){
          console.log(eval(args[0]));
        }
        if (expr.value === 'if'){
          if (eval(args[0])){
            eval(args[1]);
          } else {
            eval(args[2]);
          }
        };
        if (expr.value === 'while'){
          while (eval(args[0])){
            eval(args[1]);
          }
        }
        break;
    }
  }
}


function evalPrg(text){
  const eval = start();
  try {
    eval(parsePrg(text).expr);
  } 
  catch (error){
   console.log(error.message);
  }
}