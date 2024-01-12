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
  IProgramService,
  PROGRAMS_SERVICE,
} from '../programs-service/programs.service';
import { Request, Response } from 'express';

export interface IProgramController {}

@Controller('programs')
export class ProgramController implements IProgramController {
  constructor(
    @Inject(PROGRAMS_SERVICE) private readonly programsService: IProgramService,
  ) {}

  @Get(':idProgram')
  async getProgramInfo(req: Request, res: Response) {
    const idProgram = Number(req.params.idProgram);
    if (!idProgram) {
      res.status(400).send({ message: "Не указан идентификатор программы!" });
      return;
    }
    try {
      const program = await this.programsService.getProgram(idProgram);
    res.status(200).send({
      title: program.title,
    });
    } catch (error) {
      res.status(500).send({ message: `Внутренняя ошибка: ${error}` });
    }
    
  }

  @Delete(':idProgram')
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

  @Post(':idProgram')
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

  @Put(':idProgram')
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