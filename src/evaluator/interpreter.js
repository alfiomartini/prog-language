function eval(exprTree){
  switch (exprTree.type) {
    case "string":
      return exprTree.value;
    case "number":
      return parseFloat(exprTree.value);
      break;
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
      break;
  }
}