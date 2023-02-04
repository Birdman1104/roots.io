import { ROTATION_SPEED_DEGREES, SPEED, TOLERANCE } from "../utils/gameconfigs";
import { BackgroundView } from "./BackgroundView";
import { Seed } from "./Seed";

export class GameView extends Phaser.GameObjects.Container {
    private bkg: BackgroundView;
    private hole: Phaser.Physics.Arcade.Sprite;
    private seeds: Seed[] = [];

    public constructor(public scene) {
        super(scene);
        this.init();
    }

    public update(time, delta): void {
        this.bkg?.update(time, delta);
        this.followPointer(this.scene.input.activePointer);
        Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation(
            this.hole.rotation,
            this.scene.input.activePointer.isDown ? SPEED : 0,
            this.hole.body.velocity,
        );

        this.seeds.forEach((s, i) => {
            const { x: hx, y: hy, width: hw } = this.hole;
            const { x: sx, y: sy, isEaten } = s;
            const dist = Math.sqrt((hx - sx) * (hx - sx) + (hy - sy) * (hy - sy));
            if (dist < hw / 2 && !isEaten) {
                s.isEaten = true;
                this.scene.add.tween({
                    targets: s,
                    x: hx,
                    y: hy,
                    scale: 0.5,
                    duration: 20,
                    onComplete: () => this.onSeedSwallowComplete(s, i),
                });
                console.log(123);
            }
        });
    }

    private init(): void {
        this.initBkg();
        this.initHole();
        this.initSeeds();

        this.scene.cameras.main.startFollow(this.hole);
    }

    private initBkg(): void {
        this.bkg = new BackgroundView(this.scene);
        this.add(this.bkg);
    }

    private initHole(): void {
        this.hole = this.scene.physics.add.sprite(100, 100, "game-assets", "hole.png");
        this.add(this.hole);
    }

    private followPointer(pointer: Phaser.Input.Pointer): void {
        let angleToPointer = 0;
        let angleDelta = 0;
        if (pointer.isDown) {
            angleToPointer = Phaser.Math.Angle.Between(this.hole.x, this.hole.y, pointer.worldX, pointer.worldY);
            angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this.hole.rotation);
        }

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TOLERANCE)) {
            this.hole.rotation = angleToPointer;
            this.hole.setAngularVelocity(0);
        } else {
            this.hole.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
        }
    }

    private initSeeds(): void {
        for (let i = 0; i < 50; i++) {
            this.addSeed();
        }
    }

    private onSeedSwallowComplete(seed: Seed, _index: number): void {
        seed.destroy();
    }

    private addSeed(): void {
        const seed = new Seed(this.scene);
        seed.x = Math.random() * 1000;
        seed.y = Math.random() * 600;
        this.seeds.push(seed);
        this.add(seed);
    }
}
