import * as WebSocket from "ws";

export interface Player {
    gameId: string;
    socket: WebSocket;
}