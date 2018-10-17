# Bowling Kata
My implementation of the bowling code kata written in TypeScript with Jest testing framework.  

The requirements of the game are as follows:

* when rolling all gutter balls, the score is 0.
* when rolling all 1s, the score is 20.
* when the first frame is a spare and each subsequent roll score 2, the score is 48.
* when the first 2 frames are spares with [5,5] and subsequent rolls score 2, the score is 59.
* when 10 frames have been bowled, don't allow any more to be bowled.
* when the first frame is a strike and subsequent rolls score 2, the score is 50.
* when the first 2 frames are strikes and the rest score 2, the score is 68.
* when rolling a perfect game, the score is 300.
* when rolling alternate strikes and spares, the score is 200.

## Running the code

After cloning the repo, perform the following at the command line:

```console
npm install
npm test
```

You should see something similar to the following output:

```console
> jest

ts-jest[main] (WARN) Replace any occurrences of "ts-jest/dist/preprocessor.js" or  "<rootDir>/node_modules/ts-jest/preprocessor.js" in the 'transform' section of your Jest config with just "ts-jest".
 PASS  __tests__/bowling.tests.ts
  Bowling game
    √ should have a score of 0 when all gutter balls rolled (15ms)
    √ should have a score of 20 when all 1's rolled
    √ should have a score of 48 when the first frame is a spare and all 2s
    √ should have a score of 59 when the first two frames are spares and all 2s
    √ should fail when more than 10 frames have been bowled
    √ should have a score of 50 when the first frame is a strike and all 2s
    √ should have a score of 68 when the first two frames are a strike and all 2s
    √ should have a score of 300 when all strikes
    √ should have a score of 200 when alternating strikes and spares
    √ should have a score of 170 when we bowl sample
    √ should fail when roll is less than 0
    √ should fail when roll2 is less than 0
    √ should fail when roll is greater than 10
    √ should fail when roll2 is greater than 10 (16ms)
    √ should fail when the sum of the rolls in a frame are greater than 10
    √ should fail when bonus roll is less than 0
    √ should fail when bonus roll2 is less than 0
    √ should fail when bonus roll is greater than 10
    √ should fail when bonus roll2 is greater than 10
    √ should fail when bonus rolls not in the last frame

Test Suites: 1 passed, 1 total
Tests:       20 passed, 20 total
Snapshots:   0 total
Time:        4.747s
Ran all test suites.
```

## Thoughts

There are several variations on this kata. I took the approach of adding *frames*. The [original kata](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata) added each roll separately. I think doing it by frame makes it a bit simpler, at least in my head. I also added additional validation, which made my rollFrame() method quite long. Although I tried to make the solution as straight forward as possible, I am sure there is room for improvement. 
