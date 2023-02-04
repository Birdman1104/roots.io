import { ObservableModel } from "./ObservableModel";

export class PlayerModel extends ObservableModel {
    private _score = 0;

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
        // this.score = 0;
        // this.generateRound();
        // const botConfig = generateBotsConfig(10);
    }

    public increaseScore(): void {
        this.score++;
    }
}
