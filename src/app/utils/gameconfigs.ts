import { shuffleArray } from "./functions";

export const SPEED = 250;
export const ROTATION_SPEED = 1 * Math.PI; // 0.5 turn per sec, 2 sec per turn
export const ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(ROTATION_SPEED);
export const TOLERANCE = 0.02 * ROTATION_SPEED;

export const seeds: string[] = ["green", "blue", "yellow"];

const botNames = [
    "BotBros",
    "BotBurst",
    "RoboRider",
    "CircuitCrusher",
    "RoboRampage",
    "BotBlast",
    "CyberCrusher",
    "BotBehemoth",
    "CircuitChaos",
    "RoboRavager",
    "BotBrawler",
    "CyberChampion",
    "CircuitCommander",
    "RoboRocker",
    "BotBash",
    "CyberConqueror",
    "CircuitCrasher",
    "RoboRebel",
    "BotBattler",
    "CyberCrusader",
    "CircuitCharger",
    "RoboRager",
    "BotBuster",
    "CyberContender",
    "CircuitClasher",
    "RoboRambler",
    "BotBasher",
    "CyberChaser",
    "CircuitCombatant",
    "RoboRioter",
    "BotBlader",
    "CyberCompetitor",
    "CircuitCrusher",
    "RoboRascal",
    "BotBattler",
    "CyberConqueror",
    "CircuitChampion",
    "RoboRavager",
    "BotBeater",
    "CyberCrusher",
    "CircuitCombiner",
    "RoboRiot",
    "BotBash",
    "CyberChaos",
    "CircuitCrasher",
    "RoboRebel",
    "BotBattler",
    "CyberCrusader",
    "CircuitCharger",
    "RoboRage",
];

export const generateBotsConfig = (n: number): BotDataConfig[] => {
    const names = shuffleArray(botNames);
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push({
            id: `${i}`,
            size: 0.75,
            color: Math.random() * 0xffffff,
            score: 0,
            speed: SPEED * 5,
            username: names[i],
        });
    }

    return arr;
};
