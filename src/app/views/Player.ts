export class Player extends Phaser.Physics.Arcade.Sprite {
    public constructor(public scene) {
        super(scene, 0, 0, "game-assets", "hole.png");
        // this.setSize(this.hole.width, this.hole.height);
    }
}
