import Head from "../../models/HeadModel";

export const updateScorelistCommand = (): void => {
    Head.gameModel.updateScorelist();
};
