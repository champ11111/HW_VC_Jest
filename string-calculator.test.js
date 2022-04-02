const Add = numbers => {
  if(numbers === "") return 0;
  let delimiter = ","
  if(numbers.startsWith('//')){
    delimiter = numbers.split('\n')[0].split('//')[1];
    numbers = numbers.split('\n')[1];
  }

  let sum = 0;
  let position = 0

  const arrayOfNumbers = numbers.split("\n").join(",").split(delimiter);

  console.log("delimiter: ", delimiter);

  console.log("array is ->",arrayOfNumbers)

  for(let number of arrayOfNumbers){
    if(number.length === 0) {
      throw new Error("Empty number is not allowed")
    }
    if(number.length > 1){
      let wrongDelimeter = "";
      for(let e of number){
        if(isNaN(e)){
          wrongDelimeter = e;
          break;
        }
        position++;
      }
      throw new Error(`'${delimiter}' expected but got '${wrongDelimeter}' at position ${position}`)
    }
    console.log("number is ->",number)
    sum += parseInt(number)
    position += 2
  }
  return sum
}

test('empty string will return 0', () => {
  expect(Add("")).toBe(0);
});

test('input "1" will return 1',()=>{
  expect(Add("1")).toBe(1);
})

test('input "1,2" will return 3',()=>{
  expect(Add("1,2")).toBe(3);
})

test('input "1,2\n3" will return 6',()=>{
  expect(Add("1,2\n3")).toBe(6);
})

test('input  "1,2," will throw error',()=>{
  expect(()=>{
    Add("1,2,")
  }).toThrow();
})

test('input "//;\n1;3" will return 4',()=>{
  expect(Add("//;\n1;3")).toBe(4);
})

test('input "//|\n1|2|3" will return 6',()=>{
  expect(Add("//|\n1|2|3")).toBe(6);
})

test('input "//sep\n2sep5" will return 7',()=>{
  expect(Add("//sep\n2sep5")).toBe(7);
})

test('input "//|\n1|2,3" to throw error message',()=>{
  expect(()=>{
    Add("//|\n1|2,3")
  }).toThrowError("'|' expected but got ',' at position 3");
})
