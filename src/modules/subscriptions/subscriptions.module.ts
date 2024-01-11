import { Module } from '@nestjs/common';
import { SUBSCRIPTIONS_REPO, SubscriptionRepo } from './subscriptions-repo/subscriptions.repo';
import { SubscriptionController } from './subscriptions-controller/subscriptions.controller';
import { DatabaseModule } from '../database/database.module';
import {
    SUBSCRIPTIONS_SERVICE,
    SubscriptionService,
} from './subscriptions-service/subscriptions.servive';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: SUBSCRIPTIONS_REPO,
      useClass: SubscriptionRepo,
    },
    {
      provide: SUBSCRIPTIONS_SERVICE,
      useClass: SubscriptionService,
    },
  ],
  controllers: [SubscriptionController],
})
export class SubscriptionsModule {}
