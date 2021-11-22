// https://web.stanford.edu/class/archive/cs/cs103/cs103.1156/tools/cfg/

// expr-> id apply
// apply -> '(' arg_list ')' | ''
// arg_list -> '' | expr rest_list
// rest_list -> ',' expr rest_list | ''
// id -> number | string | identifier

function parseExpression(program) {
  program = skipSpaces(program);
  let { expr: _expr, program: _program } = match_id(program);
  let { expr: expr_, program: program_ } = match_apply(_expr, _program);
  return { expr: expr_, program: program_ };
}

function match_id(program) {
  program = skipSpaces(program);
  let match, expr;
  // strings
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: "string", value: match[1] };
  }
  // numbers
  else if ((match = /^[+-]?\d+(\.\d+)?/.exec(program))) {
    expr = { type: "number", value: match[0] };
  }
  // identifiers (for definitions)
  else if ((match = /^\w+|[-*+/><=]{1,2}/.exec(program))) {
    expr = { type: "identifier", name: match[0] };
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
  const applyExp = { type: "apply", operator: expr, args: [] };
  // result = {exp, program}
  const result = match_argList(applyExp, program);
  if (result.program[0] !== ")") {
    throw new SyntaxError("Closing parenthesis expected: " + result.program);
  }
  // remove closing parenthesis and remaining spaces/newlines, etc
  result.program = skipSpaces(result.program.slice(1));
  return result;
}

function match_argList(expr, program) {
  program = skipSpaces(program);
  // empty application (no args)
  if (program[0] === ")") return { expr, program };
  // result = {expr, program}
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

export function skipSpaces(text) {
  // return text.replace(/\s/gm, "");
  let index = text.search(/\S/);
  if (index === -1) {
    return "";
  } else {
    text = text.slice(index);
    // remove line comments (if any)
    if (text[0] === "#") return text.replace(/#.*\s*/, "");
    else return text;
  }
}

export function parsePrg(text) {
  let expr, program;
  try {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    ({ expr, program } = parseExpression(text));
    if (skipSpaces(program).length > 0) {
      throw new SyntaxError("Unexpected text after program :" + program);
    }
    return { expr, program };
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
}
