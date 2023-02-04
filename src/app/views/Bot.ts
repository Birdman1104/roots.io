export class Bot extends Phaser.GameObjects.Container {
    private hole: Phaser.GameObjects.Sprite;
    public constructor(public scene, private config: BotDataConfig) {
        super(scene);
        console.warn(this.config);

        this.init();
        this.setSize(this.hole.width, this.hole.height);
    }

    public get id(): string {
        return this.config.id;
    }

    private init(): void {
        this.initImg();
    }

    private initImg(): void {
        this.hole = this.scene.add.sprite(0, 0, "game-assets", `hole.png`);
        this.hole.tint = this.config.color;
        this.add(this.hole);
    }
}
