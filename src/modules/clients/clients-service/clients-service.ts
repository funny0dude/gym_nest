import { Client } from '../../database/entities/Client.entity';
import { IClientRepo, CLIENTS_REPO } from '../clients-repo/clients-repo';
import { Inject, Injectable } from '@nestjs/common';

export const CLIENTS_SERVICE = 'CLIENTS_SERVICE';

export interface IClientService {
  getClient(idClient: number): Promise<Client>;
  deleteClient(idClient: number): Promise<void>;
  createClient(
    firstname: string,
    surname: string,
    patronymic: string,
    phone: string,
  ): Promise<void>;
  updateClient(
    idClient: number,
    firstname: string,
    surname: string,
    patronymic: string,
    phone: string,
  ): Promise<void>;
}

@Injectable()
export class ClientService implements IClientService {
  constructor(
    @Inject(CLIENTS_REPO) private readonly clientsRepo: IClientRepo,
  ) {}

  async getClient(idClient: number) {
    const client = await this.clientsRepo.getClient(idClient);
    if (!client) throw new Error('Клиент не найден!');
    return client;
  }

  async deleteClient(idClient: number) {
    const client = await this.clientsRepo.getClient(idClient);
    if (!client) throw new Error('Клиент не найден!');
    await this.clientsRepo.deleteClient(client);
  }

  async createClient(
    firstname: string,
    surname: string,
    patronymic: string,
    phone: string,
  ) {
    const client = new Client();
    client.firstname = firstname;
    client.surname = surname;
    client.patronymic = patronymic;
    client.phone = phone;
    await this.clientsRepo.createClient(client);
  }

  async updateClient(
    idClient: number,
    firstname: string,
    surname: string,
    patronymic: string,
    phone: string,
  ) {
    const client = await this.clientsRepo.getClient(idClient);
    if (!client) throw new Error('Клиент не найден!');
    client.firstname = firstname;
    client.surname = surname;
    client.patronymic = patronymic;
    client.phone = phone;
    await this.clientsRepo.updateClient(client);
  }
}
