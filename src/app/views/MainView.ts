import { lego } from "@armathai/lego";
import { MainViewEvents } from "../../events/GameEvents";
import { ForegroundView } from "./ForegroundView";
import { GameView } from "./GameView";
import { ResultView } from "./ResultView";
import { UIView } from "./UIView";

export class MainView extends Phaser.GameObjects.Container {
    private gameView: GameView;
    private uiView: UIView;
    private foregroundView: ForegroundView;
    private resultView: ResultView;

    public constructor(public scene) {
        super(scene);
        this.build();
    }

    public init(): void {
        //
    }

    public update(time, delta): void {
        this.gameView.update(time, delta);
    }

    private build(): void {
        this.add((this.gameView = new GameView(this.scene)));
        this.add((this.uiView = new UIView(this.scene)));
        this.add((this.resultView = new ResultView(this.scene)));
        this.add((this.foregroundView = new ForegroundView(this.scene)));

        lego.event.emit(MainViewEvents.ViewsReady);
    }
}
