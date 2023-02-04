import { BackgroundView } from "./BackgroundView";

const SPEED = 1000;
const ROTATION_SPEED = 1 * Math.PI; // 0.5 turn per sec, 2 sec per turn
const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
const TOLERANCE = 0.02 * ROTATION_SPEED;

export class GameView extends Phaser.GameObjects.Container {
    private bkg: BackgroundView;
    private hole: Phaser.Physics.Arcade.Sprite;

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
    }

    private init(): void {
        this.initBkg();
        this.initHole();

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
}
