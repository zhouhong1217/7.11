'use strict';
describe('FizzBuzz',() => {
  // it('when there is no rule,should print num',() => {
  //  let result = '3';
  //  expect(makeNumberToFizzBuzzWhizz()).toEqual(result);
  // });

  it('give num = 3,when num % 3 == 0,should print Fizz',() =>{
    let num = 3;
    let result = 'Fizz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 25,when num % 5 == 0,should print Buzz',() => {
    let num = 25;
    let result = 'Buzz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 28,when num % 7 == 0,should print Whizz',() => {
    let num = 28;
    let result = 'Whizz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 15,when num % 3 ==0 && num % 5 ==0,should print FizzBuzz',() => {
    let num = 15;
    let result = 'FizzBuzz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 21,when num % 3 ==0 && num % 7 ==0,should print FizzWhizz',() => {
    let  num = 21;
    let result = 'FizzWhizz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 35,when num % 5 == 0 && num % 7 ==0,should print BuzzWhizz',() =>{
    let num = 35;
    let result = 'Fizz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 2,when num % 3 != 0 && num % 5 != 0 && num % 7 != 0,should print num',() =>{
    let num = 2;
    let result = num;
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 210,when num % 3 == 0 && num % 5 ==0 && num % 7 == 0,should print FizzBuzzWhizz',() => {
    let num = 210;
    let result = 'FizzBuzzWhizz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

  it('give num = 203,when num.toString.split has 3,should print Fizz',() =>{
    let num = 203;
    let result = 'Fizz';
    expect(makeNumberToFizzBuzzWhizz(num)).toEqual(result);
  });

});