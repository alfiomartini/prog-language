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
const prg07 = `print(256)`;
const prg08 = `print(-(+(20,30), *(15,10)))`; // -100
const prg09 = `do(define(x, 3.1415), print(x))`;
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

const prg12 = `do(define(plusOne, fun(x, +(x,1))), 
                  print(plusOne(10)))`;
const prg13 = `do(define(sign, fun(x, if(>=(x,0),"positive","negative"))),
                  print(sign(10)))`;
const prg14 = `do(define(sign, fun(x, if(>=(x,0),"positive","negative"))),
                  print(sign(-5)))`;

const prg15 = `
  # this is a comment
  do(define(x,10),
    if(>(x,5), # another comment
    print("large"),
    # another comment
    print("small")))`;

const prg16 = `
      do(
        define(pow, fun(base, exp,
          if(==(exp, 0), 1, 
          *(base, pow(base, -(exp,1)))))),
          print(pow(2,10)))
    `;
const prg17 = `do(define(arr, array(1,2,3)), 
                   print(arr))`;

// 15
const prg18 = `
do(
  define(sum, 
    fun(arr, 
      do(define(i,0),
        define(total,0),
        while(<(i, length(arr)),
          do(define(total, +(total, elem(arr,i))),
             define(i,+(i,1)))),
        # total is the value returned by the function
        total))),
	print(sum(array(1,2,3,4,5))))
`;
const prog19 = `
  do(define(x,4),
     # set is used to update ids already defined
     # kind of global bindings in the context
     define(setx, fun(val, set(x,val))),
     # x = 4
     print(x),
     setx(50),
     # x = 50
     print(x))
`;

const prog20 = `
  do(define(x,4),
     define(sety, fun(val, set(y,val))),
     # reference error
     sety(50))
`;

export const programs = [
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
  prg12,
  prg13,
  prg14,
  prg15,
  prg16,
  prg17,
  prg18,
  prog19,
  prog20,
];
