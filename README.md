# A (Programming) Language based on Application Expressions

This is a parser/evaluator for a simple imperative programming language, whose constructs are uniformly expressed as applications of the form _f(e_1,...,e_n)_, where _f_ is a identifier and _(e_1,...,e_n)_ is a possibly empty list of application expressions. If the list is empty, then _f_ is an atom, i.e, an _identifier_, a _string_ or a _number_. The are special (reserved) forms of application expressions to express the usual imperative constructions for _assignment_, _conditional_, _sequence_, _while_ loops and _arithmetic_ operations. The language also supports some abstraction by the definition of (recursive) functions. Line comments and (one-dimensional) arrays are also provided. The scope chain that links global and local environments is modeled with the object prototype chains provided by JavaScript. The language syntax is directly adapted from the excellent _Eloquent JavaScript_ book (chapter 12). The interpreter is comprised by a parser and a evaluator. The first is a top down recursive descent parser written by hand from a context free grammar of the language. The regular subset of the language is recognized with _regular expressions_. The evaluator is defined by a recursive function that follows the inductive definition of application expressions (see above).
