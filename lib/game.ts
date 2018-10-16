interface IBowlingFrame {
    roll1: number;
    roll2?: number;
    bonus1?: number;
    bonus2?: number;
}

export class Game {
    public currentFrame = 0;
    private frames: IBowlingFrame[] = [];

    constructor() {
        // init the frames
        for (let i = 0; i < 12; i++) {
            this.frames.push({roll1: 0, roll2: 0});
         }
    }

    public rollFrame(frame: IBowlingFrame) {
        if (this.currentFrame >= 10) {
            throw new RangeError("10 frames have been bowled");
        }

        if (frame.roll1 < 0) {
            throw new RangeError("Negative rolls not allowed");
        }

        if (frame.roll1 > 10) {
            throw new RangeError("Rolls must be less than or equal to 10");
        }

        if (frame.roll2 && frame.roll2 < 0) {
            throw new RangeError("Negative rolls not allowed");
        }

        if (frame.roll2 && frame.roll2 > 10) {
            throw new RangeError("Rolls must be less than or equal to 10");
        }

        if (frame.roll1 + this.getDefOrVal(frame.roll2) > 10) {
            throw new RangeError("The sum of the rolls must be less than or equal to 10");
        }

        if (this.currentFrame < 9 &&
            (this.getDefOrVal(frame.bonus1) !== 0 || this.getDefOrVal(frame.bonus2) !== 0)) {
            throw new RangeError("Bonus roll are only allowed on the last frame");
        }

        this.frames[this.currentFrame].roll1 = frame.roll1;
        this.frames[this.currentFrame].roll2 = this.getDefOrVal(frame.roll2);
        this.currentFrame++;

        // if the last frame include bonus rolls
        if (this.currentFrame === 10) {
            this.addBonusRolls(this.getDefOrVal(frame.bonus1), this.getDefOrVal(frame.bonus2));
        }
    }

    public score(): number {
        let score = 0;

        // sum the frames
        for (let i = 0; i < 10; i++) {
            if (this.isStrike(i)) {
                score += this.strikeScore(i);
            } else if (this.isSpare(i)) {
                score += this.spareScore(i);
            } else {
                score += this.frameScore(i);
            }
        }
        return score;
    }

    private isStrike(frameNum: number): boolean {
        return this.frames[frameNum].roll1 === 10;
    }

    private isSpare(frameNum: number): boolean {
        return this.frames[frameNum].roll1 + this.getDefOrVal(this.frames[frameNum].roll2) === 10;
    }

    private strikeScore(frameNum: number): number {
        if (this.isStrike(frameNum + 1)) {
            return 10 + this.frames[frameNum + 1].roll1 + this.frames[frameNum + 2].roll1;
        }
        return 10 + this.frames[frameNum + 1].roll1 + this.getDefOrVal(this.frames[frameNum + 1].roll2);
    }

    private spareScore(frameNum: number): number {
        return 10 + this.frames[frameNum + 1].roll1;
    }

    private frameScore(frameNum: number): number {
        return this.frames[frameNum].roll1 + this.getDefOrVal(this.frames[frameNum].roll2);
    }

    private getDefOrVal(value: number | undefined): number {
        return value ? value : 0;
    }

    private addBonusRolls(bonusRoll1: number, bonusRoll2: number) {
        // could validate that a bonus should only be on a strike or spare in the 10th frame
        // could validate that a bonus roll2 should only be on a strike in the 10th frame

        if (bonusRoll1 < 0) {
            throw new RangeError("Negative bonus rolls not allowed");
        }

        if (bonusRoll1 > 10) {
            throw new RangeError("Bonus rolls must be less than or equal to 10");
        }

        if (bonusRoll2 < 0) {
            throw new RangeError("Negative bonus rolls not allowed");
        }

        if (bonusRoll2 > 10) {
            throw new RangeError("Bonus rolls must be less than or equal to 10");
        }

        if (bonusRoll1 === 10) {
            this.frames[10].roll1 = bonusRoll1;
            this.frames[11].roll1 = bonusRoll2;
        } else {
            this.frames[10].roll1 = bonusRoll1;
            this.frames[10].roll2 = bonusRoll2;
        }
    }
}
