import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Client } from '../../database/entities/Client.entity';
import { TYPEORM_CONNECTION } from '../../database/TypeormConnection';

export const CLIENTS_REPO = 'CLIENTS_REPO';

export interface IClientRepo {
  getClient(idClient: number): Promise<Client | null>;
  deleteClient(client: Client): Promise<void>;
  createClient(client: Client): Promise<void>;
  updateClient(client: Client): Promise<void>;
}

@Injectable()
export class ClientsRepo implements IClientRepo {
  constructor(
    @Inject(TYPEORM_CONNECTION) private readonly connection: DataSource,
  ) {}

  async getClient(idClient: number) {
    // SELECT * FROM clients WHERE clients.id = :idClient
    const client = await this.connection
      .createQueryBuilder(Client, 'client')
      .where('client.id = :idClient', { idClient })
      .getOne();
    return client;
  }

  async deleteClient(client: Client) {
    // SELECT * FROM clients WHERE clients.id = :idClient
    await this.connection.getRepository(Client).remove(client);
  }

  async createClient(client: Client) {
    await this.connection.createEntityManager().save(client);
  }

  async updateClient(client: Client) {
    await this.connection.createEntityManager().save(client);
  }
}
