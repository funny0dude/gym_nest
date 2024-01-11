import { Subscription } from "../database/entities/Subscription.entity";
import { SubscriptionsRepo } from "./subscriptions-repo";
import { ISubscriptionsRepo, TSubscription } from "./subscriptions-repo";

export interface ISubscriptionsService {
  getSubscription(idSubscription: number): Promise<TSubscription[]>
  deleteSubscription(idSubscription: number): Promise<TSubscription[]>
  createSubscription(idSubscription: number, duration_id: string, program_id: string, buy_date: string): Promise<TSubscription[]> 
  updateSubscription(idSubscription: number, duration_id: string, program_id: string, buy_date: string): Promise<TSubscription[]>
}

export class SubscriptionService_1 implements ISubscriptionsService {
  constructor(private readonly programRepo: ISubscriptionsRepo) {}
  subscriptionRepo: any;

  async getSubscription() {
    const subscription = await this.subscriptionRepo.getSubscription(1);
    if (subscription.length === 0) throw new Error("Нет клиентов!");
    return subscription;
  }

  async deleteSubscription() {
    const subscription = await this.subscriptionRepo.deleteSubscription(1);
    if (subscription.length === 0) throw new Error("Нет клиентов!");
    return subscription;
  }

  async createSubscription() {
    const subscription = await this.subscriptionRepo.createSubscription(1, 'Test', 'Test', 'Test');
    if (subscription.length === 0) throw new Error("Нет клиентов!");
    return subscription;
  }

  async updateSubscription() {
    const subscription = await this.subscriptionRepo.updateSubscription(1, 'Test', 'Test', 'Test');
    if (subscription.length === 0) throw new Error("Нет клиентов!");
    return subscription;
  }
}

export class SubscriptionService {
  constructor(private readonly subscriptionRepo: SubscriptionsRepo) {}

  async getSubscription(idSubscription: number) {
    const subscription = await this.subscriptionRepo.getSubscription(idSubscription);
    if (!subscription) throw new Error("Абонимент не найден!");
    return subscription;
  }

  async deleteSubscription(idSubscription: number) {
    const subscription = await this.subscriptionRepo.getSubscription(idSubscription);
    if (!subscription) throw new Error("Абонимент не найден!");
    await this.subscriptionRepo.deleteSubscription(subscription);
  }

  async createSubscription(buy_date: string, program_id: number, duration_id: number) {
    const subscription = new Subscription()
    subscription.buy_date = buy_date;
    subscription.program_id = program_id;
    subscription.duration_id = duration_id;
    await this.subscriptionRepo.createSubscription(subscription);
  }

  async updateSubscription(idSubscription: number, buy_date: string, program_id: number, duration_id: number) {
    const subscription = await this.subscriptionRepo.getSubscription(idSubscription);
    if (!subscription) throw new Error("Абонимент не найден!");
    subscription.buy_date = buy_date;
    subscription.program_id = program_id;
    subscription.duration_id = duration_id;
    await this.subscriptionRepo.updateSubscription(subscription);
  }
}