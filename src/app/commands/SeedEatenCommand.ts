import { lego } from "@armathai/lego";
import { increaseScoreCommand } from "./SeedEatenCommand copy";

export const onSeedEatenCommand = (): void => {
    lego.command.execute(increaseScoreCommand);
};
