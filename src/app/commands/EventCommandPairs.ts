import { GameEvents, MainViewEvents } from "../../events/GameEvents";
import { onBotSeedEatenCommand } from "./BotSeedEatenCommand";
import { initRoundCommand } from "./InitRoundCommand";
import { onPlayerSeedEatenCommand } from "./PlayerSeedEatenCommand";

export const eventCommandPairs: { event: any; command: any }[] = [
    {
        event: GameEvents.BotSeedEaten,
        command: onBotSeedEatenCommand,
    },
    {
        event: GameEvents.PlayerSeedEaten,
        command: onPlayerSeedEatenCommand,
    },
    {
        event: MainViewEvents.ViewsReady,
        command: initRoundCommand,
    },
];
