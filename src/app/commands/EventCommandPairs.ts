import { GameEvents } from "../../events/GameEvents";
import { onSeedEatenCommand } from "./SeedEatenCommand";

export const eventCommandPairs: { event: any; command: any }[] = [
    {
        event: GameEvents.SeedEaten,
        command: onSeedEatenCommand,
    },
];
