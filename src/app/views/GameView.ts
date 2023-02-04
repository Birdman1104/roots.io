import { lego } from "@armathai/lego";
import { GameEvents } from "../../events/GameEvents";
import { RoundModelEvents } from "../../events/ModelEvents";
import { BotModel } from "../../models/BotModel";
import { ROTATION_SPEED_DEGREES, SPEED, TOLERANCE } from "../utils/gameconfigs";
import { BackgroundView } from "./BackgroundView";
import { Bot } from "./Bot";
import { Seed } from "./Seed";

export class GameView extends Phaser.GameObjects.Container {
    private bkg: BackgroundView;
    private hole: Phaser.Physics.Arcade.Sprite;
    private seeds: Seed[] = [];
    private bots: Bot[] = [];

    public constructor(public scene) {
        super(scene);

        lego.event.on(RoundModelEvents.BotsUpdate, this.onBotsUpdate, this);

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

        this.seeds.forEach((s) => {
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
                    onComplete: () => this.onPlayerSeedSwallowComplete(s),
                });
            }
        });

        this.seeds.forEach((s) => {
            this.bots.forEach((b) => {
                const { x: hx, y: hy, width: hw } = b;
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
                        onComplete: () => this.onBotSeedSwallowComplete(s, b),
                    });
                }
            });
        });
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

    private onBotsUpdate(newValue: BotModel[], _oldValue: BotModel[]): void {
        if (newValue.length === 0 && !newValue) {
            this.bots.forEach((b) => b.destroy);
            this.bots = [];
        } else {
            this.initBots(newValue);
            this.initSeeds();
        }
    }

    private initBots(config: BotModel[]): void {
        for (let i = 0; i < config.length; i++) {
            const { id, name, score, speed, color, size } = config[i];
            const viewConfig = { id, name, score, speed, color, size };
            const bot = new Bot(this.scene, viewConfig);
            this.add(bot);
            this.bots.push(bot);
            this.moveBot(bot);
        }
    }

    private moveBot(bot: Bot): void {
        const x = Math.random() * 1000;
        const y = Math.random() * 700;
        const { x: bx, y: by } = bot;
        const dist = Math.sqrt((x - bx) * (x - bx) + (y - by) * (y - by));

        this.scene.add.tween({
            targets: bot,
            x,
            y,
            duration: dist * 20,
            onComplete: () => this.moveBot(bot),
        });
    }

    private followPointer(pointer: Phaser.Input.Pointer): void {
        const angleToPointer = Phaser.Math.Angle.Between(this.hole.x, this.hole.y, pointer.worldX, pointer.worldY);
        const angleDelta = Phaser.Math.Angle.Wrap(angleToPointer - this.hole.rotation);

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

    private onBotSeedSwallowComplete(seed: Seed, bot: Bot): void {
        this.addSeed();
        this.removeSeed(seed);
        lego.event.emit(GameEvents.BotSeedEaten, bot.id);
    }

    private onPlayerSeedSwallowComplete(seed: Seed): void {
        this.addSeed();
        this.removeSeed(seed);
        lego.event.emit(GameEvents.PlayerSeedEaten);
    }

    private removeSeed(seed: Seed): void {
        const index = this.seeds.indexOf(seed);
        seed.destroy();
        this.seeds.splice(index, 1);
    }

    private addSeed(): void {
        const seed = new Seed(this.scene, this.seeds.length + 1);
        seed.x = Math.random() * 1000;
        seed.y = Math.random() * 600;
        this.seeds.push(seed);
        this.add(seed);
    }
}
