import { ObservableModel } from "./ObservableModel";

export class PlayerModel extends ObservableModel {
    private _score: number;

    public constructor() {
        super("PlayerModel");
        this.makeObservable();
    }

    public get score(): number {
        return this._score;
    }

    public set score(value: number) {
        this._score = value;
    }

    public init(): void {
        this.score = 0;
    }

    public increaseScore(value = 0): void {
        this.score += Math.max(value, 1);
    }
}
