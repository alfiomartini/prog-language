// https://web.stanford.edu/class/archive/cs/cs103/cs103.1156/tools/cfg/

// expr-> id apply
// apply -> '(' arg_list ')' | ''
// arg_list -> '' | expr rest_list
// rest_list -> ',' expr rest_list | ''
// id -> number | string | identifier

function parseExpression(program) {
  program = skipSpaces(program);
  let id = match_id(program);
  let result = match_apply(id.expr, id.program);
  return { expr: result.expr, program: result.program };
}

function match_id(program) {
  program = skipSpaces(program);
  let match, expr;
  // strings
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: "identifier", value: match[1] };
  }
  // numbers
  else if ((match = /^\d+/.exec(program))) {
    expr = { type: "number", value: match[0] };
  }
  // identifiers (for definitions)
  else if ((match = /^\w+|[-*+/><=]{1,2}/.exec(program))) {
    expr = { type: "identifier", value: match[0] };
  } else {
    throw new SyntaxError("Error in identifier syntax: " + match[0]);
  }
  // update program text
  program = program.slice(match[0].length);
  return { expr, program };
}

function match_apply(expr, program) {
  program = skipSpaces(program);
  if (program[0] !== "(") return { expr: expr, program: program };
  // it is an application, remove '(' and proceed to match arguments
  program = program.slice(1);
  const expr_ = { type: "apply", expr: expr, args: [] };
  const result = match_argList(expr_, program);
  if (result.program[0] !== ")") {
    throw new SyntaxError("Closing parenthesis expected: " + result.program);
  }
  // remove closing parenthesis
  result.program = result.program.slice(1);
  return result;
}

function match_argList(expr, program) {
  program = skipSpaces(program);
  // empty application (no args)
  if (program[0] === ")") return { expr, program };
  let result = parseExpression(program);
  expr.args.push(result.expr);
  result = match_restList(expr, result.program);
  return result;
}

function match_restList(expr, program) {
  program = skipSpaces(program);
  if (program[0] !== ",") return { expr, program };
  // remove ','
  program = program.slice(1);
  let result = parseExpression(program);
  expr.args.push(result.expr);
  result = match_restList(expr, result.program);
  return result;
}

function skipSpaces(text) {
  // return text.replace(/\s/gm, "");
  let index = text.search(/\S/);
  if (index === -1) {
    return "";
  } else {
    return text.slice(index);
  }
}

function parsePrg(text) {
  let expr, program;
  try {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    ({ expr, program } = parseExpression(text));
    if (skipSpaces(program).length > 0) {
      throw new SyntaxError("Unexpect text after program :" + program);
    }
  } catch (error) {
    console.log(error.message);
  }
  return { expr, program };
}
