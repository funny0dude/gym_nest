import { Module } from '@nestjs/common';
import { ClientsModule } from './modules/clients/clients.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { ProgramsModule } from './modules/programs/programs.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [ClientsModule, SubscriptionsModule, ProgramsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
