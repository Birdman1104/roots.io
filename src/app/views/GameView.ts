export class GameView extends Phaser.GameObjects.Container {
    private bkg: Phaser.GameObjects.Sprite;

    public constructor(public scene) {
        super(scene);
        this.init();
    }

    private init(): void {
        this.initBkg();
    }

    private initBkg(): void {
        const { width, height } = this.scene.scale.gameSize;
        this.bkg = this.scene.add.sprite(width / 2, height / 2, "bkg.jpg");
        this.add(this.bkg);
    }
}
