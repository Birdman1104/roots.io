import Head from "../../models/HeadModel";

export const onPlayerSeedEatenCommand = (): void => {
    Head.gameModel.playerModel.increaseScore();
};
