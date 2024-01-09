import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'public.clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstname!: string;

  @Column()
  surname!: string;

  @Column()
  patronymic!: string;

  @Column()
  phone!: string;

  // @OneToMany(() => ClientProgram, (clientProgram) => clientProgram.client)
  // clientPrograms!: ClientProgram[];

  // @OneToMany(
  //   () => ClientSubscription,
  //   (clientSubscription) => clientSubscription.client,
  // )
  // clientSubscriptions!: ClientSubscription[];
}
