const SPEED = 100;
const ROTATION_SPEED = 1 * Math.PI; // 0.5 turn per sec, 2 sec per turn
const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
const TOLERANCE = 0.02 * ROTATION_SPEED;

export class GameView extends Phaser.GameObjects.Container {
    private bkg: Phaser.GameObjects.Sprite;
    private hole: Phaser.Physics.Arcade.Sprite;
    private frameUpdate: Phaser.Time.TimerEvent;

    public constructor(public scene) {
        super(scene);
        this.init();
    }

    public update(...args: any[]): void {
        console.log(1, args);
    }

    private init(): void {
        this.initBkg();
        this.initHole();

        this.frameUpdate = this.scene.time.addEvent({
            callback: this.timerEvent,
            callbackScope: this,
            delay: 1 / 60, // 1000 = 1 second
            loop: true,
        });
    }

    private timerEvent(): void {
        this.followPointer(this.scene.input.activePointer);
        Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation(
            this.hole.rotation,
            this.scene.input.activePointer.isDown ? SPEED : 0,
            this.hole.body.velocity,
        );
    }

    private initBkg(): void {
        const { width, height } = this.scene.scale.gameSize;
        this.bkg = this.scene.add.sprite(width / 2, height / 2, "bkg.jpg");
        this.bkg.setInteractive();
        // this.bkg.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
        this.add(this.bkg);
    }

    private initHole(): void {
        this.hole = this.scene.physics.add.sprite(100, 100, "game-assets", "hole.png");
        this.add(this.hole);
    }

    // private onPointerDown(){
    //     this.pointerDown = true
    // }

    private followPointer(pointer: Phaser.Input.Pointer): void {
        let angleToPointer = 0;
        let angleDelta = 0;
        if (pointer.isDown) {
            angleToPointer = Phaser.Math.Angle.Between(this.hole.x, this.hole.y, pointer.worldX, pointer.worldY);
            angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this.hole.rotation);
            // return;
        }

        if (Phaser.Math.Fuzzy.Equal(angleDelta, 0, TOLERANCE)) {
            this.hole.rotation = angleToPointer;
            this.hole.setAngularVelocity(0);
        } else {
            this.hole.setAngularVelocity(Math.sign(angleDelta) * ROTATION_SPEED_DEGREES);
        }
    }
}
