import { Request, Response } from "express";
import { ProgramService } from "./service";
import { Program } from "../database/entities/Program.entity";

export class ProgramController {
  constructor(private readonly programsService: ProgramService) {}

  async getProgramInfo(req: Request, res: Response) {
    const idProgram = Number(req.params.idProgram);
    if (!idProgram) {
      res.status(400).send({ message: "Не указан идентификатор программы!" });
      return;
    }
    try {
      const program = await this.programsService.getProgramInfo(idProgram);
    res.status(200).send({
      title: program.title,
    });
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
    
  }

  async deleteProgram(req: Request, res: Response) {
    const idProgram = Number(req.params.idProgram);
    if (!idProgram) {
      res.status(400).send({ message: "Не указан идентификатор программы!" });
      return;
    }
    try {
    await this.programsService.deleteProgram(idProgram);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  async createProgram(req: Request, res: Response) {
    const title = String(req.body.firstname);
    if (!title) {
      res.status(400).send({ message: "Не указано название программы!" });
      return;
    }
    const room_code = String(req.body.surname);
    if (!room_code) {
      res.status(400).send({ message: "Не указан код комнаты!" });
      return;
    }
    try {
    await this.programsService.createProgram(title, room_code);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }

  async updateProgram(req: Request, res: Response) {
    const idProgram = Number(req.params.idProgram);
    if (!idProgram) {
      res.status(400).send({ message: "Не указан идентификатор программы!" });
      return;
    }
    const title = String(req.body.buy_date);
    if (!title) {
      res.status(400).send({ message: "Не указана дата покупки!" });
      return;
    }
    const room_code = String(req.body.buy_date);
    if (!room_code) {
      res.status(400).send({ message: "Не указана дата покупки!" });
      return;
    }
    try {
    await this.programsService.updateProgram(idProgram, title, room_code);
      res.status(200).end();
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
  }
}