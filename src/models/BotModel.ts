import { ObservableModel } from "./ObservableModel";

export class BotModel extends ObservableModel {
    private _id: string;
    private _size: number;
    private _color: number;
    private _score = 0;
    private _speed: number;
    private _username: string;

    public constructor(private config: BotDataConfig) {
        super("BotModel");
        this.makeObservable();

        this.init();
    }

    public get score(): number {
        return this._score;
    }

    public set score(value: number) {
        this._score = value;
    }

    public get color(): number {
        return this._color;
    }

    public set color(value: number) {
        this._color = value;
    }

    public get size(): number {
        return this._size;
    }

    public set size(value: number) {
        this._size = value;
    }

    public get id(): string {
        return this._id;
    }

    public set id(value: string) {
        this._id = value;
    }
    public get speed(): number {
        return this._speed;
    }

    public set speed(value: number) {
        this._speed = value;
    }
    public get username(): string {
        return this._username;
    }

    public set username(value: string) {
        this._username = value;
    }

    public increaseScore(value = 0): void {
        this.score += Math.max(value, 1);
    }

    public init(): void {
        this.id = this.config.id;
        this._size = this.config.size;
        this._color = this.config.color;
        this.speed = this.config.speed;
        this.username = this.config.username;
    }
}
