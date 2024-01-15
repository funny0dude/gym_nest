import { Module } from '@nestjs/common';
import { CLIENTS_REPO, ClientsRepo } from './clients-repo/clients.repo';
import { ClientsController } from './clients-controller/clients.controller';
import { DatabaseModule } from '../database/database.module';
import {
  CLIENTS_SERVICE,
  ClientService,
} from './clients-service/clients.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: CLIENTS_REPO,
      useClass: ClientsRepo,
    },
    {
      provide: CLIENTS_SERVICE,
      useClass: ClientService,
    },
  ],
  controllers: [ClientsController],
})
export class ClientsModule {}
