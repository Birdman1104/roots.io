import { seeds } from "../utils/gameconfigs";

export class Seed extends Phaser.GameObjects.Container {
    public seedType: string;
    public isEaten = false;
    private seedImg: Phaser.GameObjects.Sprite;

    public constructor(public scene, public id) {
        super(scene);
        this.seedType = seeds[Math.floor(Math.random() * 3)];

        this.init();
    }

    private init(): void {
        this.initFruit();
    }

    private initFruit(): void {
        this.seedImg = this.scene.add.sprite(0, 0, "game-assets", `seed_${this.seedType}.png`);
        this.seedImg.setScale(3);
        this.add(this.seedImg);
    }
}
