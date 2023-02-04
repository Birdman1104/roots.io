import { lego } from "@armathai/lego";
import { increaseBotScoreCommand } from "./IncreaseBotScoreCommand";

export const onBotSeedEatenCommand = (botID: string): void => {
    lego.command.payload(botID).execute(increaseBotScoreCommand);
};
