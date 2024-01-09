import {
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import {
  IClientService,
  CLIENTS_SERVICE,
} from '../clients-service/clients-service';
import { Request, Response } from 'express';

export interface IClientsController {}

@Controller('clients')
export class ClientsController implements IClientsController {
  constructor(
    @Inject(CLIENTS_SERVICE) private readonly clientsService: IClientService,
  ) {}

  // GET http://localhost:3000/clients/1/
  @Get(':idClient')
  async getClientInfo(@Req() req: Request, @Res() res: Response) {
    const idClient = Number(req.params.idClient);
    if (!idClient) {
      res.status(400).send({ message: 'Не указан идентификатор клиента!' });
      return;
    }
    try {
      const client = await this.clientsService.getClient(idClient);
      res.status(200).send({
        firstname: client.firstname,
      });
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  // DELETE http://localhost:3000/clients/1/
  @Delete(':idClient')
  async deleteClient(@Req() req: Request, @Res() res: Response) {
    const idClient = Number(req.params.idClient);
    if (!idClient) {
      res.status(400).send({ message: 'Не указан идентификатор клиента!' });
      return;
    }
    try {
      await this.clientsService.deleteClient(idClient);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  // POST http://localhost:3000/clients/
  @Post()
  async createClient(@Req() req: Request, @Res() res: Response) {
    const firstname = String(req.body.firstname);
    if (!firstname) {
      res.status(400).send({ message: 'Не указано имя клиента!' });
      return;
    }
    const surname = String(req.body.surname);
    if (!surname) {
      res.status(400).send({ message: 'Не указана фамилия клиента!' });
      return;
    }
    const patronymic = String(req.body.patronymic);
    if (!patronymic) {
      res.status(400).send({ message: 'Не указано отчество клиента!' });
      return;
    }
    const phone = String(req.body.phone);
    if (!phone) {
      res.status(400).send({ message: 'Не указан телефон клиента!' });
      return;
    }
    try {
      await this.clientsService.createClient(
        firstname,
        surname,
        patronymic,
        phone,
      );
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  // POST http://localhost:3000/clients/
  @Put(':idClient')
  async updateClient(@Req() req: Request, @Res() res: Response) {
    const idClient = Number(req.params.idClient);
    if (!idClient) {
      res.status(400).send({ message: 'Не указан идентификатор клиента!' });
      return;
    }
    const firstname = String(req.body.firstname);
    if (!firstname) {
      res.status(400).send({ message: 'Не указано имя клиента!' });
      return;
    }
    const surname = String(req.body.surname);
    if (!surname) {
      res.status(400).send({ message: 'Не указана фамилия клиента!' });
      return;
    }
    const patronymic = String(req.body.patronymic);
    if (!patronymic) {
      res.status(400).send({ message: 'Не указано отчество клиента!' });
      return;
    }
    const phone = String(req.body.phone);
    if (!phone) {
      res.status(400).send({ message: 'Не указан телефон клиента!' });
      return;
    }
    try {
      await this.clientsService.updateClient(
        idClient,
        firstname,
        surname,
        patronymic,
        phone,
      );
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }
}
