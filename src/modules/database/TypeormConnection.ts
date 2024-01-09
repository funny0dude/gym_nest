import { DataSource } from 'typeorm';
import { Client } from './entities/Client.entity';

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
      entities: [Client],
    });

    await connection.initialize();

    return connection;
  },
};
