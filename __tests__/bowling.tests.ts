import { Game } from "../lib/game";

// when rolling all gutter balls, the score is 0.
// when rolling all 1s, the score is 20.
// when the first frame is a spare and each subsequent roll score 2, the score is 48.
// when the first 2 frames are spares with [5,5] and subsequent rolls score 2, the score is 59.
// when 10 frames have been bowled, don't allow any more to be bowled.
// when the first frame is a strike and subsequent rolls score 2, the score is 50.
// when the first 2 frames are strikes and the rest score 2, the score is 68.
// when rolling a perfect game, the score is 300.
// when rolling alternate strikes and spares, the score is 200.

// when rolling example, the score is 170.
// when roll is less than 0, don't allow.
// when roll is greater than 10, don't allow.
// when rolls in a frame are greater than 10, don't allow.
// when bonus roll is less than 0, don't allow.
// when bonus roll is greater than 10, don't allow.
// whne bonus roll not on last frame, don't allow it.

describe("Bowling game", () => {

    let game: Game;

    beforeEach(() => {
        game = new Game();
    });

    test("should have a score of 0 when all gutter balls rolled", () => {
        for (let i = 0; i < 10; i++) {
            game.rollFrame({roll1: 0, roll2: 0});
        }
        expect(game.score()).toBe(0);
    });

    test("should have a score of 20 when all 1's rolled", () => {
        for (let i = 0; i < 10; i++) {
            game.rollFrame({roll1: 1, roll2: 1});
        }
        expect(game.score()).toBe(20);
    });

    test("should have a score of 48 when the first frame is a spare and all 2s", () => {
         game.rollFrame({roll1: 9, roll2: 1});
         for (let i = 0; i < 9; i++) {
             game.rollFrame({roll1: 2, roll2: 2});
         }
         expect(game.score()).toBe(48);
    });

    test("should have a score of 59 when the first two frames are spares and all 2s", () => {
        game.rollFrame({roll1: 5, roll2: 5});
        game.rollFrame({roll1: 5, roll2: 5});
        for (let i = 0; i < 8; i++) {
            game.rollFrame({roll1: 2, roll2: 2});
        }
        expect(game.score()).toBe(59);
    });

    test("should fail when more than 10 frames have been bowled", () => {
        expect( () => {
            for (let i = 0; i < 11; i++) {
                game.rollFrame({roll1: 2, roll2: 2});
            }
        }).toThrow(RangeError);
    });

    test("should have a score of 50 when the first frame is a strike and all 2s", () => {
        game.rollFrame({roll1: 10});
        for (let i = 0; i < 9; i++) {
            game.rollFrame({roll1: 2, roll2: 2});
        }
        expect(game.score()).toBe(50);
    });

    test("should have a score of 68 when the first two frames are a strike and all 2s", () => {
        game.rollFrame({roll1: 10});
        game.rollFrame({roll1: 10});
        for (let i = 0; i < 8; i++) {
            game.rollFrame({roll1: 2, roll2: 2});
        }
        expect(game.score()).toBe(68);
    });

    test("should have a score of 300 when all strikes", () => {
        for (let i = 0; i < 9; i++) {
            game.rollFrame({roll1: 10});
        }

        // last frame
        game.rollFrame({roll1: 10, bonus1: 10, bonus2: 10});

        expect(game.score()).toBe(300);
    });

    test("should have a score of 200 when alternating strikes and spares", () => {
        game.rollFrame({roll1: 10});                            // 1
        game.rollFrame({roll1: 4, roll2: 6});                   // 2
        game.rollFrame({roll1: 10});                            // 3
        game.rollFrame({roll1: 7, roll2: 3});                   // 4
        game.rollFrame({roll1: 10});                            // 5
        game.rollFrame({roll1: 9, roll2: 1});                   // 6
        game.rollFrame({roll1: 10});                            // 7
        game.rollFrame({roll1: 5, roll2: 5});                   // 8
        game.rollFrame({roll1: 10});                            // 9
        game.rollFrame({roll1: 8, roll2: 2, bonus1: 10});      // 10

        expect(game.score()).toBe(200);
    });

    test("should have a score of 170 when we bowl sample", () => {
        game.rollFrame({roll1: 8, roll2: 2});   // 1
        game.rollFrame({roll1: 7, roll2: 3});   // 2
        game.rollFrame({roll1: 3, roll2: 4});   // 3
        game.rollFrame({roll1: 10});            // 4
        game.rollFrame({roll1: 2, roll2: 8});   // 5
        game.rollFrame({roll1: 10});            // 6
        game.rollFrame({roll1: 10});            // 7
        game.rollFrame({roll1: 8});             // 8
        game.rollFrame({roll1: 10});            // 9
        game.rollFrame({roll1: 8, roll2: 2, bonus1: 9});   // 10

        expect(game.score()).toBe(170);
    });

    test("should fail when roll is less than 0", () => {
        expect( () => {
            game.rollFrame({roll1: -1});
        }).toThrow(RangeError);
    });

    test("should fail when roll2 is less than 0", () => {
        expect( () => {
            game.rollFrame({roll1: 0, roll2: -1});
        }).toThrow(RangeError);
    });

    test("should fail when roll is greater than 10", () => {
        expect( () => {
            game.rollFrame({roll1: 11});
        }).toThrow(RangeError);
    });

    test("should fail when roll2 is greater than 10", () => {
        expect( () => {
            game.rollFrame({roll1: 0, roll2: 11});
        }).toThrow(RangeError);
    });

    test("should fail when the sum of the rolls in a frame are greater than 10", () => {
        expect( () => {
            game.rollFrame({roll1: 6, roll2: 5});
        }).toThrow(RangeError);
    });

    test("should fail when bonus roll is less than 0", () => {
        expect( () => {
            for (let i = 0; i < 9; i++) {
                game.rollFrame({roll1: 10});
            }

            // last frame
            game.rollFrame({roll1: 10, bonus1: -1});
        }).toThrow(RangeError);
    });

    test("should fail when bonus roll2 is less than 0", () => {
        expect( () => {
            for (let i = 0; i < 9; i++) {
                game.rollFrame({roll1: 10});
            }

            // last frame
            game.rollFrame({roll1: 10, bonus1: 1, bonus2: -1});
        }).toThrow(RangeError);
    });

    test("should fail when bonus roll is greater than 10", () => {
        expect( () => {
            for (let i = 0; i < 9; i++) {
                game.rollFrame({roll1: 10});
            }

            // last frame
            game.rollFrame({roll1: 10, bonus1: 11});
        }).toThrow(RangeError);
    });

    test("should fail when bonus roll2 is greater than 10", () => {
        expect( () => {
            for (let i = 0; i < 9; i++) {
                game.rollFrame({roll1: 10});
            }

            // last frame
            game.rollFrame({roll1: 10, bonus1: 1, bonus2: 11});
        }).toThrow(RangeError);
    });

    test("should fail when bonus rolls not in the last frame", () => {
        expect( () => {
            for (let i = 0; i < 8; i++) {
                game.rollFrame({roll1: 10});
            }

            // last frame
            game.rollFrame({roll1: 10, bonus1: 1, bonus2: 1});
        }).toThrow(RangeError);
    });
});
