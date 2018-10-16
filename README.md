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

After cloning the repo perform the following at the command line:

```console
npm install
npm test
```

## Thoughts

There are several variations on this kata. I took the approach of adding and scoring *frames*. The [original kata](http://butunclebob.com/ArticleS.UncleBob.TheBowlingGameKata) added each roll separately. I think doing it by frame makes it a bit simpler, at least in my head. I also added additional validation, which made my rollFrame() method quite long. Although I tried to make the solution as straight forward as possible, I am sure there is room for improvement. 
