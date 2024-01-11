import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Subscription } from '../../database/entities/Subscription.entity';
import { TYPEORM_CONNECTION } from '../../database/TypeormConnection';

export const SUBSCRIPTIONS_REPO = 'SUBSCRIPTIONS_REPO';

export interface ISubscriptionRepo {
  getSubscription(idSubscription: number): Promise<Subscription | null>;
  deleteSubscription(subscription: Subscription): Promise<void>;
  createSubscription(subscription: Subscription): Promise<void>;
  updateSubscription(subscription: Subscription): Promise<void>;
}

@Injectable()
export class SubscriptionRepo implements ISubscriptionRepo {
  constructor(
    @Inject(TYPEORM_CONNECTION) private readonly connection: DataSource,
  ) {}
  
  async getSubscription(idSubscription: number) {
    const subscriptions = await this.connection
      .createQueryBuilder(Subscription, "subscription")
      .where("subscription.id = :idSubscription", { idSubscription })
      .getOne();
    return subscriptions;
  }

  async deleteSubscription(subscription: Subscription) {
    await this.connection.getRepository(Subscription).remove(subscription);
  }

  async createSubscription(subscription: Subscription) { 
    await this.connection.createEntityManager().save(subscription);
  }

  async updateSubscription(subscription: Subscription) { 
    await this.connection.createEntityManager().save(subscription);
  }
}