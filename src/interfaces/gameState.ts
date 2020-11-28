import { Card } from "./card";

export interface GameState {
    cards: Partial<Card>[];
}