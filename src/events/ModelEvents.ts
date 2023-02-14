export const BotModelEvents = {
    ScoreUpdate: "BotModelScoreUpdate",
    ColorUpdate: "BotModelColorUpdate",
    SizeUpdate: "BotModelSizeUpdate",
    IdUpdate: "BotModelIdUpdate",
    SpeedUpdate: "BotModelSpeedUpdate",
    UsernameUpdate: "BotModelUsernameUpdate",
};

export const GameModelEvents = {
    ScoreUpdate: "GameModelScoreUpdate",
    RoundModelUpdate: "GameModelRoundModelUpdate",
    PlayerModelUpdate: "GameModelPlayerModelUpdate",
    ScorelistUpdate: "GameModelScorelistUpdate",
};

export const HeadModelEvents = { GameModelUpdate: "HeadModelGameModelUpdate" };

export const PlayerModelEvents = { ScoreUpdate: "PlayerModelScoreUpdate" };

export const RoundModelEvents = { RoundUpdate: "RoundModelRoundUpdate", BotsUpdate: "RoundModelBotsUpdate" };
