import { evalPrg } from "../src/evaluator/interpreter.js";

const programs = [
  "print(256)",
  "do(define(a,5),define(x, +(a,10)),print(x))",
  `do(define(house, "red house"), print(house))`,
  `do(define(x,10),if(>(x,5),print("large"),print("small")))`,
  `do(define(x,*(3, +(5,10))), print(x))`,
  `print(x)`,
  `do(define(total,0),
    define(count,1),
    while(<(count,11),
    do(define(total, +(total, count)),
       define(count, +(count, 1)))),
    print(total))`,
];

describe("Testing simple expressions", () => {
  it(`should evaluate program 0 to 256`, () => {
    expect(evalPrg(programs[0])).toEqual(256);
  });
  it("should evaluate program 1 to 15", () => {
    expect(evalPrg(programs[1])).toEqual(15);
  });
  it("should evaluate program 2 to 'red house'", () => {
    expect(evalPrg(programs[2])).toEqual("red house");
  });
});

describe("Testing simple commands", () => {
  it(` should evaluate program 3 to 'large'`, () => {
    expect(evalPrg(programs[3])).toEqual("large");
  });

  it(`should evaluate program 4 to 45`, () => {
    expect(evalPrg(programs[4])).toEqual(45);
  });
});

describe("Testing errors", () => {
  it(`should evaluate program 5 to 'identifier x is not defined'`, () => {
    expect(evalPrg(programs[5])).toEqual("identifier x is not defined.");
  });
});

describe("Testing loops", () => {
  it(`should evaluate program 6 to 55`, () => {
    expect(evalPrg(programs[6])).toEqual(55);
  });
});
