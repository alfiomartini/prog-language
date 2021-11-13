const prg01 = `
  do(define(x,10),
    if(>(x,5),
    print("large"),
    print("small")))`;
const prg02 = `
    do(define(a,5),
       define(x, +(a,10)),
       print(x))`;
const prg03 = `do(define(house, "red house"), print(house))`;
const prg04 = `do(define(x,*(5,10)), print(x))`; // 50
const prg05 = `do(define(x,*(3, +(5,10))), print(x))`; // 45
const prg06 = `print(x)`;
const prg07 = `256`;
const prg08 = `-(+(20,30), *(15,10))`; // -100
const prg09 = `define(x, 10)`;
const prg10 = `+(x,10)`;
// total = 55
const prg11 = `
    do(define(total,0),
      define(count,1),
      while(<(count,11),
      do(define(total, +(total, count)),
         define(count, +(count, 1)))),
      print(total))
`;

const programs = [
  prg01,
  prg02,
  prg03,
  prg04,
  prg05,
  prg06,
  prg07,
  prg08,
  prg09,
  prg10,
  prg11,
];
