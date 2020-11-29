import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, } from "@nestjs/websockets";
import { Subject } from "rxjs";
import { Player } from "../interfaces/player";
import { Server } from "socket.io";

@WebSocketGateway(8089)
export class EventsGateway implements OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    players: Player[] = [];

    identification$ = new Subject();

    afterInit(server: Server) {
        server.on('connection', client => {
            console.log('# client connected');
        });
    }

    handleDisconnect(client) {
        console.log('# client disconnected');
        this.players = this.players.filter(player => {
            console.log('client left', player.gameId);
            return player.socket === client;
        });
    }

    broadcast(gameId: string, event: string, data: any) {
        this.server.to(gameId).emit(event, data);
    }

    @SubscribeMessage('register')
    registerEvent(socket, data) {
        socket.join(data.gameId);
        console.log('client entered', data.gameId);
    }

    @SubscribeMessage('identify')
    identifyEvent(client, data) {
        console.log('## identifying', data);
        this.identification$.next(data);
    }
}