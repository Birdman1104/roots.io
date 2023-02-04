export class BackgroundView extends Phaser.GameObjects.Container {
    private frameUpdate: Phaser.Time.TimerEvent;
    private controls: Phaser.Cameras.Controls.SmoothedKeyControl;

    public constructor(public scene) {
        super(scene);
        this.init();
    }

    public update(time, delta): void {
        this.controls?.update(delta);
    }

    private init(): void {
        const map = this.scene.make.tilemap({ key: "roots-map" });
        const tiles = map.addTilesetImage("roots-map", "blue");
        const layer = map.createLayer(0, tiles, 0, 0);
        this.add(layer);
        this.scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        const cursors = this.scene.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.scene.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            acceleration: 0.04,
            drag: 0.0005,
            maxSpeed: 0.7,
        };

        this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
    }
}
