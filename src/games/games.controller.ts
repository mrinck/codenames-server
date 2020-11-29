import { Controller, Get, Param, Post } from '@nestjs/common';
import { Game } from '../interfaces/game';
import { GamesService } from './games.service';

@Controller()
export class GamesController {

    constructor(private gamesService: GamesService) {}

    @Post('create')
    async create(): Promise<{ gameId: string}> {
        const gameId = this.gamesService.createGame();
        return { gameId };
    }

    @Get(':gameId')
    async getGame(@Param() params): Promise<Game> {
        console.log('GET', params.gameId);
        return this.gamesService.getGame(params.gameId);
    }

    @Get(':gameId/identities')
    async getIdentities(@Param() params): Promise<any[]> {
        console.log('GET', params.gameId);
        return this.gamesService.getIdentities(params.gameId);
    }
}

