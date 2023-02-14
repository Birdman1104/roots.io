import Head from "../../models/HeadModel";

export const overlapCommand = (id1: string, id2: string): void => {
    let p1;
    let p2;
    if (id1 === "player") {
        p1 = Head.gameModel.playerModel;
        p2 = Head.gameModel.roundModel.getBotById(id2);
    } else if (id2 === "player") {
        p1 = Head.gameModel.roundModel.getBotById(id2);
        p2 = Head.gameModel.playerModel;
    } else {
        p1 = Head.gameModel.roundModel.getBotById(id2);
        p2 = Head.gameModel.roundModel.getBotById(id2);
    }

    if (p1.score >= p2.score) {
        p1.increaseScore(p2.score);
        p2.die();
    } else {
        p2.increaseScore(p1.score);
        p1.die();
    }
};
