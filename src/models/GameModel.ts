import { generateBotsConfig } from "../app/utils/gameconfigs";
import { ObservableModel } from "./ObservableModel";
import { PlayerModel } from "./PlayerModel";
import { RoundModel } from "./RoundModel";

export class GameModel extends ObservableModel {
    private _roundModel: RoundModel;
    private _playerModel: PlayerModel;
    private _scorelist: Scorelist[] = [];
    private _round = 1;
    private _score = 0;

    public constructor() {
        super("GameModel");
        this.makeObservable();
    }

    public get score(): number {
        return this._score;
    }

    public set score(value: number) {
        this._score = value;
    }

    public get roundModel(): RoundModel {
        return this._roundModel;
    }

    public set roundModel(value: RoundModel) {
        this._roundModel = value;
    }

    public get playerModel(): PlayerModel {
        return this._playerModel;
    }

    public set playerModel(value: PlayerModel) {
        this._playerModel = value;
    }

    public get scorelist(): Scorelist[] {
        return this._scorelist;
    }

    public set scorelist(value: Scorelist[]) {
        this._scorelist = value;
    }

    public updateScorelist(): void {
        const botScores = this.roundModel.bots.map((b) => {
            return { username: b.username, score: b.score };
        });
        const allScores = [...botScores, { username: "YOU", score: this.playerModel.score }];
        const sorted = allScores.sort((a, b) => b.score - a.score);
        this._scorelist = [...sorted];
    }

    public init(): void {
        this._playerModel = new PlayerModel();
        this._playerModel.init();
    }

    public generateRound(): void {
        const botConfig = generateBotsConfig(12);
        this._roundModel = new RoundModel(botConfig, this._round);
        this.updateScorelist();
    }
}
