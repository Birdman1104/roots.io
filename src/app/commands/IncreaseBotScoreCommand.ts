import Head from "../../models/HeadModel";

export const increaseBotScoreCommand = (botID: string): void => {
    const bot = Head.gameModel.roundModel.getBotById(botID);
    bot.increaseScore();
};
