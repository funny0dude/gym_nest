import { Subscription } from '../../database/entities/Subscription.entity';
import { ISubscriptionRepo, SUBSCRIPTIONS_REPO } from '../subscriptions-repo/subscriptions.repo';
import { Inject, Injectable } from '@nestjs/common';

export const SUBSCRIPTIONS_SERVICE = 'SUBSCRIPTIONS_SERVICE';

export interface ISubscriptionService {
  getSubscription(idSubscription: number): Promise<Subscription>;
  deleteSubscription(idSubscription: number): Promise<void>;
  createSubscription(
    buy_date: string,
    duration_id: number,
    program_id: number,
  ): Promise<void>;
  updateSubscription(
    idSubscription: number,
    buy_date: string,
    duration_id: number,
    program_id: number,
  ): Promise<void>;
}

@Injectable()
export class SubscriptionService implements ISubscriptionService {
  constructor(
    @Inject(SUBSCRIPTIONS_REPO) private readonly subscriptionsRepo: ISubscriptionRepo,
  ) {}

  async getSubscription(idSubscription: number) {
    const subscription = await this.subscriptionsRepo.getSubscription(idSubscription);
    if (!subscription) throw new Error("Абонимент не найден!");
    return subscription;
  }

  async deleteSubscription(idSubscription: number) {
    const subscription = await this.subscriptionsRepo.getSubscription(idSubscription);
    if (!subscription) throw new Error("Абонимент не найден!");
    await this.subscriptionsRepo.deleteSubscription(subscription);
  }

  async createSubscription(buy_date: string, program_id: number, duration_id: number) {
    const subscription = new Subscription()
    subscription.buy_date = buy_date;
    subscription.program_id = program_id;
    subscription.duration_id = duration_id;
    await this.subscriptionsRepo.createSubscription(subscription);
  }

  async updateSubscription(idSubscription: number, buy_date: string, program_id: number, duration_id: number) {
    const subscription = await this.subscriptionsRepo.getSubscription(idSubscription);
    if (!subscription) throw new Error("Абонимент не найден!");
    subscription.buy_date = buy_date;
    subscription.program_id = program_id;
    subscription.duration_id = duration_id;
    await this.subscriptionsRepo.updateSubscription(subscription);
  }

}