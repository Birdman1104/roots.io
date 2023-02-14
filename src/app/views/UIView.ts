import { lego } from "@armathai/lego";
import { GameModelEvents } from "../../events/ModelEvents";

export class UIView extends Phaser.GameObjects.Container {
    private scoreText: Phaser.GameObjects.Text;

    public constructor(public scene) {
        super(scene);

        lego.event.on(GameModelEvents.ScorelistUpdate, this.onScorelistUpdate, this);
        this.init();
    }

    private init(): void {
        this.initScoreText();
    }

    private onScorelistUpdate(scorelist: Scorelist[]): void {
        const text = scorelist.map((s, i) => {
            return `${i + 1}) ${s.username} - ${s.score}`;
        });

        this.scoreText.setText(text);
    }

    private initScoreText(): void {
        this.scoreText = this.scene.add
            .text(30, 60, "", {
                fontFamily: "Arial",
                fontSize: 24,
                color: "#000000",
            })
            .setScrollFactor(0);
        this.add(this.scoreText);
    }
}
