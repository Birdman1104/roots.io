import { GameEvents, MainViewEvents } from "../../events/GameEvents";
import { BotModelEvents, PlayerModelEvents } from "../../events/ModelEvents";
import { onBotSeedEatenCommand } from "./BotSeedEatenCommand";
import { initRoundCommand } from "./InitRoundCommand";
import { overlapCommand } from "./OverlapCommand";
import { onPlayerSeedEatenCommand } from "./PlayerSeedEatenCommand";
import { updateScorelistCommand } from "./UpdateScorelistCommand";

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
    {
        event: PlayerModelEvents.ScoreUpdate,
        command: updateScorelistCommand,
    },
    {
        event: BotModelEvents.ScoreUpdate,
        command: updateScorelistCommand,
    },
    {
        event: GameEvents.Overlap,
        command: overlapCommand,
    },
];
