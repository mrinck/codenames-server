import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';

@Module({
  imports: [],
  controllers: [GamesController],
  providers: [GamesService, EventsGateway],
})
export class GamesModule {}
