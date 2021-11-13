const prg01 = `
  do(define(x,10),
    if(>(x,5),
    print("large"),
    print("small")))`;
const prg02 = `
    do(define(a,5),
       define(x, +(a,10)),
       print(x))`;
const prg03 = `define(house, "large")`;
const prg04 = `+(5,10)`; // 15
const prg05 = `*(3, +(5,10))`; // 45
const prg06 = `"Hello World!"`;
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
