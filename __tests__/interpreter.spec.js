import { evalPrg } from "../src/evaluator/interpreter.js";

describe("Testing simple expressions", () => {
  test("print(256)= 256", () => {
    expect(evalPrg("print(256)")).toEqual(256);
  });
  test("do(define(a,5),define(x, +(a,10)),print(x)) = 15", () => {
    expect(evalPrg("do(define(a,5),define(x, +(a,10)),print(x))")).toEqual(15);
  });
  test("do(define(house, 'red house'), print(house)) = red house", () => {
    expect(evalPrg(`do(define(house, "red house"), print(house))`)).toEqual(
      "red house"
    );
  });
});

describe("Testing simple commands", () => {
  test(`do(define(x,10),if(>(x,5),print("large"),print("small")))=large`, () => {
    expect(
      evalPrg(`do(define(x,10),if(>(x,5),print("large"),print("small")))`)
    ).toEqual("large");
  });

  test(`do(define(x,*(3, +(5,10))), print(x))=45`, () => {
    expect(evalPrg(`do(define(x,*(3, +(5,10))), print(x))`)).toEqual(45);
  });
});

describe("Testing errors", () => {
  test(`print(x) = identifier x is not defined`, () => {
    expect(evalPrg(`print(x)`)).toEqual("identifier x is not defined.");
  });
});

describe("Testing loops", () => {
  test(`
  do(define(total,0),
    define(count,1),
    while(<(count,11),
    do(define(total, +(total, count)),
       define(count, +(count, 1)))),
    print(total)) = 55
`, () => {
    expect(
      evalPrg(`
  do(define(total,0),
    define(count,1),
    while(<(count,11),
    do(define(total, +(total, count)),
       define(count, +(count, 1)))),
    print(total))
`)
    ).toEqual(55);
  });
});
