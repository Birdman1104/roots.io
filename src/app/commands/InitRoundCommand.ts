import Head from "../../models/HeadModel";

export const initRoundCommand = (): void => {
    Head.gameModel.generateRound();
};
