import { DataSource } from "typeorm";
import { Subscription } from "../database/entities/Subscription.entity";

export type TSubscription = {
  id: number; duration_id: string; program_id: string; buy_date: string;
}

export interface ISubscriptionsRepo {
  getSubscription(idSubscription: number): Promise<TSubscription[]>
  deleteSubscription(idSubscription: number): Promise<TSubscription[]>
  createSubscription(idSubscription: number, duration_id: string, program_id: string, buy_date: string): Promise<TSubscription[]>
  updateSubscription(idSubscription: number, duration_id: string, program_id: string, buy_date: string): Promise<TSubscription[]>
}

export class ArrayPostgresRepo implements ISubscriptionsRepo {
  private readonly array: TSubscription[] = [ { id: 1, duration_id: 'Test', program_id: 'Test', buy_date: 'Test' }, { id: 2, duration_id: 'Test', program_id: 'Test', buy_date: 'Test' } ]
  async getSubscription(idSubscription: number) {
      return this.array.sort((a, b) => a.id - b.id)
  }
  async deleteSubscription(idSubscription: number) {
    return this.array.sort((a, b) => a.id - b.id)
  }
  async createSubscription(idSubscription: number, duration_id: string, program_id: string, buy_date: string) {
    return this.array.sort((a, b) => a.id - b.id)
  }
  async updateSubscription(idSubscription: number, duration_id: string, program_id: string, buy_date: string) {
    return this.array.sort((a, b) => a.id - b.id)
  }
}

export class SubscriptionsRepo {
  constructor(private readonly connection: DataSource) {}

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