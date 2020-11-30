import { Injectable } from '@nestjs/common';
import { Game } from '../interfaces/game';
import { wordlist } from './wordlist';
import { EventsGateway } from './events.gateway';

@Injectable()
export class GamesService {
    private games: Game[] = [];

    constructor(private eventsGateway: EventsGateway) {

        this.eventsGateway.identification$.subscribe(data => {
            const gameId = data['gameId'];
            const codename = data['codename'];
            const game = this.games.find(g => g.id === gameId);

            console.log('onIdentification', gameId, codename);
            console.log('game', game);

            if (game) {
                const card = game.cards.find(c => c.codename === codename);
                if (card) {
                    card.identified = true;
                    const data = {
                        codename,
                        identity: card.identity
                    };
                    this.eventsGateway.broadcast(game.id, 'identify', data);
                }
            }
        })

    }

    createGame(): string {
        const uuid = this.generateID();
        const now = Date.now();

        const game: Game = {
            id: uuid,
            cards: [],
            createdAt: now,
            lastChangedAt: now
        };

        const codenames = wordlist.slice();

        const identities = this.shuffle([
            { type: 'bystander', gender: 'female' },
            { type: 'bystander', gender: 'female' },
            { type: 'bystander', gender: 'female' },
            { type: 'bystander', gender: 'female' },
            { type: 'bystander', gender: 'male' },
            { type: 'bystander', gender: 'male' },
            { type: 'bystander', gender: 'male' },
            { type: 'assassin' },
            { type: 'red', gender: 'female' },
            { type: 'red', gender: 'female' },
            { type: 'red', gender: 'female' },
            { type: 'red', gender: 'female' },
            { type: 'red', gender: 'female' },
            { type: 'red', gender: 'male' },
            { type: 'red', gender: 'male' },
            { type: 'red', gender: 'male' },
            { type: 'red', gender: 'male' },
            { type: 'blue', gender: 'female' },
            { type: 'blue', gender: 'female' },
            { type: 'blue', gender: 'female' },
            { type: 'blue', gender: 'female' },
            { type: 'blue', gender: 'male' },
            { type: 'blue', gender: 'male' },
            { type: 'blue', gender: 'male' },
            { type: 'blue', gender: 'male' }
        ]);

        for (let i = 0; i < 25; i++) {
            const index = Math.floor(Math.floor(codenames.length) * Math.random());
            const codename = codenames[index];
            codenames.splice(index, 1);

            game.cards.push({
                codename,
                identified: false,
                identity: identities[i]
            });
        }

        console.log('GAME CREATED', uuid);
        this.games.push(game);
        return game.id;
    }

    getGames(): Game[] {
        return this.games;
    }

    getGame(id: string): Game {
        const game = this.games.find(g => g.id === id);
        if (game) {
            return {
                id: game.id,
                createdAt: game.createdAt,
                lastChangedAt: game.lastChangedAt,
                cards: game.cards.map(card => ({
                    codename: card.codename,
                    identified: card.identified,
                    identity: card.identified ? card.identity : null
                }))
            }
        }
    }

    getIdentities(gameId: string): any[] {
        const game = this.games.find(g => g.id === gameId);
        if (game) {
            return game.cards.map(c => c.identity);
        }
    }

    destroyGame(gameId: string) {
        const index = this.games.findIndex(game => game.id === gameId);
        if (index !== -1) {
            this.games.slice(index, 1);
        }
    }

    private shuffle(a: any[]): any[] {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    private generateID(length = 6): string {
        const id: string[] = [];
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";
        for (let i = 0; i < length; i++) {
            const index = Math.floor(Math.random() * chars.length);
            const char = chars[index];
            id.push(char);
        }
        return id.join('');
    }
}
