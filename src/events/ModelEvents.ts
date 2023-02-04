export const BotModelEvents = {
    ScoreUpdate: "BotModelScoreUpdate",
    ColorUpdate: "BotModelColorUpdate",
    SizeUpdate: "BotModelSizeUpdate",
    IdUpdate: "BotModelIdUpdate",
    SpeedUpdate: "BotModelSpeedUpdate",
    NameUpdate: "BotModelNameUpdate",
};

export const GameModelEvents = {
    ScoreUpdate: "GameModelScoreUpdate",
    RoundModelUpdate: "GameModelRoundModelUpdate",
    PlayerModelUpdate: "GameModelPlayerModelUpdate",
};

export const HeadModelEvents = { GameModelUpdate: "HeadModelGameModelUpdate" };

export const PlayerModelEvents = { ScoreUpdate: "PlayerModelScoreUpdate" };

export const RoundModelEvents = { RoundUpdate: "RoundModelRoundUpdate", BotsUpdate: "RoundModelBotsUpdate" };
