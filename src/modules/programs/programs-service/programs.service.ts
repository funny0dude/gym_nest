import { Program } from '../../database/entities/Program.entity';
import { IProgramRepo, PROGRAMS_REPO } from '../programs-repo/programs.repo';
import { Inject, Injectable } from '@nestjs/common';

export const PROGRAMS_SERVICE = 'PROGRAMS_SERVICE';

export interface IProgramService {
  getProgram(idClient: number): Promise<Program>;
  deleteProgram(idClient: number): Promise<void>;
  createProgram(
    title: string,
    room_code: string,
  ): Promise<void>;
  updateProgram(
    idProgram: number,
    title: string,
    room_code: string,
  ): Promise<void>;
}

@Injectable()
export class ProgramService implements IProgramService {
  constructor(
    @Inject(PROGRAMS_REPO) private readonly programsRepo: IProgramService,
  ) {}
  async getProgram(idProgram: number) {
    const program = await this.programsRepo.getProgram(idProgram);
    if (!program) throw new Error("Программа не найдена!");
    return program;
  }

  async deleteProgram(idProgram: number) {
    const program = await this.programsRepo.getProgram(idProgram);
    if (!program) throw new Error("Программа не найдена!");
    await this.programsRepo.deleteProgram(program);
  }

  async createProgram(title: string, room_code: string) {
    const program = new Program()
    program.title = title;
    program.room_code = room_code;
    await this.programsRepo.createProgram(program);
  }

  async updateProgram(idProgram: number, title: string, room_code: string) {
    const program = await this.programsRepo.getProgram(idProgram);
    if (!program) throw new Error("Программа не найдена!");
    program.title = title;
    program.room_code = room_code;
    await this.programsRepo.updateProgram(program);
  }
}