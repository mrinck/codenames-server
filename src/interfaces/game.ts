import { Card } from "./card";

export interface Game {
    id: string;
    cards: Card[];
    createdAt: number;
    lastChangedAt: number
}