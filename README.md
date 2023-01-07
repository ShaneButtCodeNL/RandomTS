# **RandomTS**

## This is a set of random probability generators such as : flip a coin, roll a die, pick a number, and random number generation.

### This project was writen in TypeScript using Node. This project was to test using a npm I create to make an api to call for random events. I have plans later to add different distributions of random values.

---

---

## **Installing**

---

---

> ### Locally to play with the code
>
> - Clone from github using `https://github.com/ShaneButtCodeNL/RandomTS.git`
> - Install dependencies using `npm install`
> - `npm run build` will build the program in a `lib` folder in the current folder.
> - `npm run test` will run the code against the test to ensure the code works
> - you can then add RandomTS to your code using either `const random = require("{PATH}/RandomTS")` or `import * as random from "{PATH}/RandomTS"`. Where **{PATH}** is the path of the lib polder after building.

---

> ### From NPM (**Prefered**)
>
> - Run `npm install @shane-butt/randomts`
> - In your program import it using either `const random = require("@shane-butt/randomts` or `import * as random from "@shane-butt/randomts"`

Congratulations welcome to Random events of mild interest.

---

---

## **Using this Random event generator**

---

---

### Import to your project

- install with `npm i @shane-butt/randomts` import using `const random = require("@shane-butt/RandomTS")` or `import * as random from "@shane-butt/RandomTS"`

### Call Random functions

> #### `random`
>
> - generate a random value in range of [0,1). This can generate 0 but not 1.
> - Can be given a value `precision` that will limit the number of decimal places that will generate
> - Can be given up to two seeds. If two seeds are given it will return same value each call.

```
import * as random from "@shane-butt/randomts";

// Generates a value in range [0,1)
const a = random.random();

// Generates a value in range [0,1) with at most 3 decimal places
const b = random.random(3);

// Generates a value in range [0,1) with at most 3 decimal places
const c = random.random(3,123_123,321_321)

// Generates a value in range [0,1) with at most 3 decimal places
const d = random.random(3,123_123,321_321)

//Because both seeds are the same
d===c
```

> #### `flipACoin`
>
> - Generate a vaue of "H" for heads or "T" for tails
> - Can be given a seed. The result will be the same for the same seed.

```
import * as random from "@shane-butt/randomts";

// Will either be "H" or "T"
const flip1 = random.flipACoin();

// Will either be "H" or "T"
const flip2 = random.flipACoin(123_123);

// Will either be "H" or "T"
const flip3 = random.flipACoin(123_123);

// Will either be "H" or "T" may be different than flip2 and flip3
const flip4 = random.flipACoin(123_456);

//Same Seed
flip2===flip3

```

> #### `rollASixSidedDie`
>
> - Generate a number in range [ 0 , 6 ]. Can generate 1 and 6.
> - Can be given a seed. Calls with the same seed will have the same result.

```
import * as random from "@shane-butt/randomts";

// Will generate a value in range of [ 1 , 6 ]
const roll1 = random.rollASixSidefDie();

// Will generate a value in range of [ 1 , 6 ]
const roll2 = random.rollASixSidefDie(123);

// Will generate a value in range of [ 1 , 6 ]
const roll3 = random.rollASixSidefDie(123);

roll2===roll3
```

> #### `rollANSidedDie`
>
> - Needs a value of n which is how many sides the die has
> - Generate a value in range of [ 1 , n ]
> - Can be given a seed. Calls with the same seed will have the same result.

```
import * as random from "@shane-butt/randomts";

// Will generate a value between [ 1 , 20 ]
const roll1 = random.rollNSidedDie(20);

// Will generate a value between [ 1 , 20 ]
const roll2 = random.rollNSidedDie(20,1234);

// Will generate a value between [ 1 , 20 ]
const roll3 = random.rollNSidedDie(20,1234);

roll2===roll3
```

> #### `shuffleArray`
>
> - Pass an array to the function and it will return a copy that is shuffled
> - Can be given two seeds. Calls with both seeds the same will have the same result.

```
import * as random from "@shane-butt/randomts";

const a= [1,2,3]

// Shuffle a. shuffled can be any permutation of [1,2,3]
const shuffled1 = random.shuffleArray(a)

// Shuffle a. shuffled can be any permutation of [1,2,3]
const shuffled2 = random.shuffleArray(a)

// Shuffle a. shuffled can be any permutation of [1,2,3]
const shuffled3 = random.shuffleArray(a)

for(let i=0;i<3;i++){
   shuffled2[i]===shuffled3[i]
}
```

> #### `shuffleArrayInPlace`
>
> - Pass an array to the function and it will shuffle it and alter the values in the original array.
> - Please use `shuffleArray` instead of this. It is better to return a copy than mutate the original.
> - Can be given two seeds. Calls with both seeds the same will have the same result.

```
import * as random from "@shane-butt/randomts";

let a = [1,2,3]

//Shuffle a. a now can be any permutation of [1,2,3]
random.shuffleArrayInPlace(a)
```

> #### `pickRandomFromArray`
>
> - Pass an array to the function and get a random value from the array.
> - Can be given a seed. Calls with the same seed will have the same result.
> - Can be given two seeds. Calls with both seeds the same will have the same result.

```
import * as random from "@shane-butt/randomts";

const a= [1,2,3]

// A value from a. Either 1 , 2 or 3
const value1 = random.pickRandomFromArray(a)

// A value from a. Either 1 , 2 or 3
const value2 = random.pickRandomFromArray(a, 123, 321)

// A value from a. Either 1 , 2 or 3
const value3 = random.pickRandomFromArray(a, 123, 321)

value2 === value3;
```

> #### `pickNRandomFromArray`
>
> - Pass an array and a value and get a number of values from the array.
> - You may also pass a third boolean value to dictate whether you would like duplicates. If you pass true it will pick duplicates. By default it will not pick duplicates.
> - If you choose not to allow duplicates the value passed must be less than or equal to the length of the array.
> - Can be given a seed. Calls with the same seed will have the same result.

```
import * as random from "@shane-butt/randomts";

const a= [1,2,3,4,5,6,7,8,9]

// Will get 5 unique values from a.
const values1 = random.pickRandomNFromArray(a,5)

// Will get 5 values from a with a possibility of duplicates.
const values2 = random.pickRandomNFromArray(a,5,true)

// Will get 5 unique values from a.
const values3 = random.pickRandomNFromArray(a,5,false)

// Will throw error as value is larger than array length.
const values1 = random.pickRandomNFromArray(a,100)

// Will get 100 values from a. Will have duplicates.
const values1 = random.pickRandomNFromArray(a,100,true)
```

> #### `randomNumberInRange`
>
> - Pass a lower limit and upper limit to get a value in range [lower,higher).
> - Can be given a seed. Calls with the same seed will have the same result.

```
import * as random from "@shane-butt/randomts";

// A value either 1 , 2 or 3
const value = random.randomNumberInRange(1,4)
```

> #### `nRandomNumbersInRange`
>
> - Pass a lower limit, upper limit, number of values "n" and an optional boolean value to allow duplicates.
> - Will get n values in range [lower,upper).
> - if duplicates are not allowed the value of n must be less than | upper - lower |.Thats the absolute value.
> - duplicates are not allowed by default.
> - Can be given a seed. Calls with the same seed will have the same result.
> - Returns an array of numbers

```
import * as random from "@shane-butt/randomts";

// Will get 10 unique values in range [-10,10).
const values1 = random.nRandomNumbersInRange(-10,10,10)

// Will get 10 values in range [-10,10). May have duplicates.
const values2 = random.nRandomNumbersInRange(-10,10,10,true)

// Will get 10 unique values in range [-10,10).
const values3 = random.nRandomNumbersInRange(-10,10,10,false)

// Will throw an error as 100 > | 10 - -10|=20
const err = random.nRandomNumbersInRange(-10,10,100)

// Will get 100 values in range [-10,10). will have duplicates.
const values4 = random.nRandomNumbersInRange(-10,10,100,true)
```

---

---

### Use The Random Number Generators

---

#### `RandomWholeNumber`

Import To project

```
import {RandomWholeNumber} from "@shane-butt/randomts"
```

Constructor

> `RandomWholeNumber( seed?:number, max=100, min=0 )`
>
> - `seed` [ number ] A number that is used to base the random values are generated from. If undefined it will generate its own seed.
> - `max` [ number ] A number that makes an upper bound for number generation. All Values generated will be strictly less then max. Defaults to 100.
> - `min` [ number ] A number that makes a floor for number generation. All Values will be greater than or equal to min. Defaults to 0.
> - `max` must be greater than `min`. If `min` is grater than or equal to max an error will be thrown.

```
import {RandomWholeNumber} from "@shane-butt/randomts"

const rng1 = new RandomWholeNumber()

const rng2 = new RandomWholeNumber(123_456_789)

const rng3 = new RandomWholeNumber(123_456_789,30,99)

```

Generate values

> `next( offset=0 )` Will generate a value in the range of the generator's min and max values.
>
> - `offset` [ number ] A value to offset the next generated value without affecting future random generations.

```
import {RandomWholeNumber} from "@shane-butt/randomts"

const rng = new RandomWholeNumber()

//Random value in range [0 , 99]
const randomValue= rng.next();
```

> `nextInRange( min:number, max:number, offset=0 )` Will generate a value in the range [ min,max ]
>
> - `min` The floor for generation. Value generated will be greater than or equal to min.
> - `max` The upper bound for number generation. Value generated will be strictly less then max.
> - This function ignores the bound the of the generator allowing generation of different values without affecting future generations.
> - `max` must be greater than `min`. If `min` is grater than or equal to max an error will be thrown.

```
import {RandomWholeNumber} from "@shane-butt/randomts"

const rng = new RandomWholeNumber()

//Random value in range [123 , 321]
const randomValue= rng.nextInRange(123,321);
```

> `reset()` Will reset the the Generator to initial state.

```
import {RandomWholeNumber} from "@shane-butt/randomts"

const rng = new RandomWholeNumber()

const a = rng.next()

rng.reset()

const b = rng.next()

//True
a===b
```

---

#### `Randomprobability`

Import To project

```
import {RandomProbability} from "@shane-butt/randomts"
```

Constructor

> `RandomProbability(seedA?: number, seedB?: number, precision = 2)`
>
> - `seedA` [ number ] a Seed used to generate numbers.
> - `seedB` [ number ] a Seed used to generate numbers.
> - `precision` [ number ] The precision of the number. This states the number of decimal places to use. Must be greater than zero. Defaults value to 2.

```
import {RandomProbability} from "@shane-butt/randomts"

const rng = new RandomProbability()

const rng2 = new RandomProbability(123)

const rng3 = new RandomProbability(123, 456)

const rng4 = new RandomProbability(123, 456, 5)
```

Generate Values

> `next(offset=0)` Generates a value in range [ 0 , 1 )
>
> - `offset` A number that can be given to offset this generated value. Defaults to zero if undefined
> - Returns a string representation of a number in the range [ 0 , 1 ).
> - Value will have `precision` number of decimal points. EX `precision=2` then `value=0.AB` where `A` and `B` are numbers.

```
import {RandomProbability} from "@shane-butt/randomts"

const rng = new RandomProbability()

const a= rng.next()

//True
typeof a === "string"

const numA = parseFloat(a)

//True
numA >= 0
//True
numA < 1
```

> `nextValue(offset=0)`
>
> - `offset` A number that can be given to offset this generated value. Defaults to zero if undefined.
> - Returns a number in the range of [ 0 , 1 ).
> - This is the same as calling `next` but calls parse float on the value automatically.
> - Value will have `precision` number of decimal points. EX `precision=2` then `value=0.AB` where `A` and `B` are numbers.
> - Since this is a number the number of decimal places may be less than `precision` as trailing zeros are ignored.

```
import {RandomProbability} from "@shane-butt/randomts"

const rng = new RandomProbability()

const a = rng.nextValue(100)

//True
typeof a === "number"

//True
a >= 0
//True
a < 1
//True
a !== 1
```

> `nextPrecision(precision:number,offset=0) : string`
>
> - `precision` The precision (number of decimals places) of the next generated value.
> - `offset` A number that can be given to offset this generated value. Defaults to zero if undefined
> - Returns a String representation of a number in range of [ 0 ,1 ). Will have a length of 2 + `precision`. EX 0.ABC

```
import {RandomProbability} from "@shane-butt/randomts"

const rng = new RandomProbability()

// a is like "0.ABCDE"
const a = rng.nextPrecision(5)

//True
typeof a === "string"

//True
a.length === 2+5
```

> `nextValuePrecision(precision:number,offset=0) : number`
>
> - `precision` The precision (number of decimals places) of the next generated value.
> - `offset` A number that can be given to offset this generated value. Defaults to zero if undefined
> - Returns a number in range of [ 0 ,1 ). Will have a length less than or equal to 2 + `precision`. It can be less as trailing zeros will be ignored. EX 0.ABC .

```
import {RandomProbability} from "@shane-butt/randomts"

const rng = new RandomProbability()

// a is like 0.ABCDE
const a = rng.nextValuePrecision(5)

//True
typeof a === "number"

//True. Can be less if trailing zeros Ex 0.12300 === 0.123.
`${a}`.length <= 2+5
```

Reset the generator

> `reset()`
>
> - Resets the generator to initial state

```
import {RandomProbability} from "@shane-butt/randomts"

const rng = new RandomProbability()

const a = rng.next()

rng.reset()

const b = rng.next()

//True
a === b
```
