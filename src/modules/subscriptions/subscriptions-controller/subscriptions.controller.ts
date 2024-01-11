import { Request, Response } from "express";
import { SubscriptionService } from "./service";

export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionService) {}

  async getSubscription(req: Request, res: Response) {
    const idSubscription = Number(req.params.idSubscription);
    if (!idSubscription) {
      res.status(400).send({ message: "Не указан идентификатор абонимента!" });
      return;
    }
    try {
      const subscription = await this.subscriptionsService.getSubscriptionInfo(idSubscription);
    res.status(200).send({
      buy_date: subscription.buy_date,
    });
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
    
  }

  async deleteSubscription(req: Request, res: Response) {
    const idSubscription = Number(req.params.idSubscription);
    if (!idSubscription) {
      res.status(400).send({ message: "Не указан идентификатор абонимента!" });
      return;
    }
    try {
    await this.subscriptionsService.deleteSubscription(idSubscription);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  async createSubscription(req: Request, res: Response) {
    const buy_date = String(req.body.buy_date);
    if (!buy_date) {
      res.status(400).send({ message: "Не указана дата покупки!" });
      return;
    }
    const program_id = Number(req.body.program_id);
    if (!program_id) {
      res.status(400).send({ message: "Не указан идентификатор программы!" });
      return;
    }
    const duration_id = Number(req.body.duration_id);
    if (!duration_id) {
      res.status(400).send({ message: "Не указано время!" });
      return;
    }
    try {
    await this.subscriptionsService.createSubscription(buy_date, program_id, duration_id);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  async updateSubscription(req: Request, res: Response) {
    const idSubscription = Number(req.params.idSubscription);
    if (!idSubscription) {
      res.status(400).send({ message: "Не указан идентификатор абонимента!" });
      return;
    }
    const buy_date = String(req.body.buy_date);
    if (!buy_date) {
      res.status(400).send({ message: "Не указана дата покупки!" });
      return;
    }
    const program_id = Number(req.body.program_id);
    if (!program_id) {
      res.status(400).send({ message: "Не указан идентификатор программы!" });
      return;
    }
    const duration_id = Number(req.body.duration_id);
    if (!duration_id) {
      res.status(400).send({ message: "Не указана продолжительность!" });
      return;
    }
    try {
    await this.subscriptionsService.updateSubscription(idSubscription, buy_date, program_id, duration_id);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }
}