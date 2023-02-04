import { BotModel } from "./BotModel";
import { ObservableModel } from "./ObservableModel";

export class RoundModel extends ObservableModel {
    private _bots: BotModel[] = [];

    public constructor(private botConfig: BotDataConfig[], private _round: number) {
        super("RoundModel");
        this.makeObservable();

        this.init();
    }

    public get round(): number {
        return this._round;
    }

    public set round(value: number) {
        this._round = value;
    }

    public get bots(): BotModel[] {
        return this._bots;
    }

    public set bots(value: BotModel[]) {
        this._bots = value;
    }

    public get botsCount(): number {
        return this._bots.length;
    }

    public init(): void {
        this.initBots();
    }

    public getBotById(id: string): BotModel {
        return this.bots.find((b) => b.id === id);
    }

    private initBots(): void {
        this._bots = this.botConfig.map((b) => new BotModel(b));
    }
}
