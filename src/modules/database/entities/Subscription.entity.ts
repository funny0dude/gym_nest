import { Column, Entity, IntegerType, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientSubscription } from "./ClientSubscription.entity";

@Entity({ name: "public.subscriptions" })
export class Subscription {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  duration_id!: number;

  @Column()
  program_id!: number;

  @Column()
  buy_date!: string;

  @OneToMany(() => ClientSubscription, (clientSubscription) => clientSubscription.client)
  clientSubscriptions!: ClientSubscription[];
}
