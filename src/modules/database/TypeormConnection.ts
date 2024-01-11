import { DataSource } from 'typeorm';
import { Client } from './entities/Client.entity';
import { Program } from "./entities/Program.entity";
import { Subscription } from "./entities/Subscription.entity";

export const TYPEORM_CONNECTION = 'TYPEORM_CONNECTION';

export const TypeormConnectionProvider = {
  provide: TYPEORM_CONNECTION,
  useFactory: async () => {
    const connection = new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '0000',
      database: 'fitness',
      synchronize: false,
      logging: true,
      entities: [Client, Program, Subscription],
    });

    await connection.initialize();

    return connection;
  },
};
