# **RandomTS**

## This is a set of random probability generators such as : flip a coin, roll a die, pick a number, and random number generation.

### This project was writen in TypeScript using Node. This project was to test using a npm I create to make an api to call for random events. I have plans later to add different distributions of random values.

---

## **Installing**

> ### Locally to play with the code
>
> - Clone from github using `https://github.com/ShaneButtCodeNL/RandomTS.git`
> - Install dependencies using `npm install`
> - `npm run build` will build the program in a `lib` folder in the current folder.
> - `npm run test` will run the code against the test to ensure the code works
> - you can then add RandomTS to your code using either `const random = require("{PATH}/RandomTS")` or `import * as random from "{PATH}/RandomTS"`. Where **{PATH}** is the path of the lib polder after building.

> ### From NPM (**Prefered**)
>
> - Run `npm install @shane-butt/randomts`
> - In your program import it using either `const random = require("@shane-butt/randomts` or `import * as random from "@shane-butt/randomts"`

Congratulations welcome to Random events of mild interest.

---

## **Using this Random event generator**

### Import to your project

- install with `npm i @shane-butt/randomts` import using `const random = require("@shane-butt/RandomTS")` or `import * as random from "@shane-butt/RandomTS"`

### Call Random functions

> #### `random`
>
> - generate a random value in range of [0,1). This can generate 0 but not 1.
> - Can be given a value `precision` that will limit the number of decimal places that will generate

```
import * as random from "@shane-butt/randomts";

// Generates a value in range [0,1)
const a = random.random();

// Generates a value in range [0,1) with at most 3 decimal places
const b = random.random(3);
```

> #### `flipACoin`
>
> - Generate a vaue of "H" for heads or "T" for tails

```
import * as random from "@shane-butt/randomts";

// Will either be "H" or "T"
const flip = random.flipACoin();
```

> #### `rollASixSidedDie`
>
> - Generate a number in range [ 0 , 6 ]. Can generate 1 and 6.

```
import * as random from "@shane-butt/randomts";

// Will generate a value in range of [ 1 , 6 ]
const roll = random.rollASixSidefDie();
```

> #### `rollANSidedDie`
>
> - Needs a value of n which is how many sides the die has
> - Generate a value in range of [ 1 , n ]

```
import * as random from "@shane-butt/randomts";

// Will generate a value between [ 1 , 20 ]
const roll = random.rollNSidedDie(20);
```

> #### `shuffleArray`
>
> - Pass an array to the function and it will return a copy that is shuffled

```
import * as random from "@shane-butt/randomts";

const a= [1,2,3]

// Shuffle a. shuffled can be any permutation of [1,2,3]
const shuffled = random.shuffleArray(a)
```

> #### `shuffleArrayInPlace`
>
> - Pass an array to the function and it will shuffle it and alter the values in the original array.
> - Please use `shuffleArray` instead of this. It is better to return a copy than mutate the original.

```
import * as random from "@shane-butt/randomts";

let a = [1,2,3]

//Shuffle a. a now can be any permutation of [1,2,3]
random.shuffleArrayInPlace(a)
```

> #### `pickRandomFromArray`
>
> - Pass an array to the function and get a random value from the array.

```
import * as random from "@shane-butt/randomts";

const a= [1,2,3]

// A value from a. Either 1 , 2 or 3
const value = random.pickRandomFromArray(a)
```

> #### `pickNRandomFromArray`
>
> - Pass an array and a value and get a number of values from the array.
> - You may also pass a third boolean value to dictate whether you would like duplicates. If you pass true it will pick duplicates. By default it will not pick duplicates.
> - If you choose not to allow duplicates the value passed must be less than or equal to the length of the array.

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
