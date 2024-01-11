import { Program } from "../database/entities/Program.entity";
import { ProgramsRepo } from "./programs-repo";
import { IProgramRepo, TProgram } from "./programs-repo";

export interface IProgramService {
  getProgram(idProgram: number): Promise<TProgram[]>
  deleteProgram(idProgram: number): Promise<TProgram[]>
  createProgram(idProgram: number, title: string, room_code: string): Promise<TProgram[]>
  updateProgram(idProgram: number, title: string, room_code: string): Promise<TProgram[]>
}

export class ProgramService_1 implements IProgramService {
  constructor(private readonly programRepo: IProgramRepo) {}
  createProgram(idProgram: number, title: string, room_code: string): Promise<TProgram[]> {
    throw new Error("Method not implemented.");
  }

  async getProgram() {
    const program = await this.programRepo.getProgram(1);
    if (program.length === 0) throw new Error("Нет клиентов!");
    return program;
  }

  async deleteProgram() {
    const program = await this.programRepo.deleteProgram(1);
    if (program.length === 0) throw new Error("Нет клиентов!");
    return program;
  }

  async createClient() {
    const program = await this.programRepo.createProgram(1, 'Test', 'Test');
    if (program.length === 0) throw new Error("Нет клиентов!");
    return program;
  }

  async updateProgram() {
    const program = await this.programRepo.updateProgram(1, 'Test', 'Test');
    if (program.length === 0) throw new Error("Нет клиентов!");
    return program;
  }
}


export class ProgramService {
  constructor(private readonly programRepo: ProgramsRepo) {}

  async getProgram(idProgram: number) {
    const program = await this.programRepo.getProgram(idProgram);
    if (!program) throw new Error("Программа не найдена!");
    return program;
  }

  async deleteProgram(idProgram: number) {
    const program = await this.programRepo.getProgram(idProgram);
    if (!program) throw new Error("Программа не найдена!");
    await this.programRepo.deleteProgram(program);
  }

  async createProgram(title: string, room_code: string) {
    const program = new Program()
    program.title = title;
    program.room_code = room_code;
    await this.programRepo.createProgram(program);
  }

  async updateProgram(idProgram: number, title: string, room_code: string) {
    const program = await this.programRepo.getProgram(idProgram);
    if (!program) throw new Error("Программа не найдена!");
    program.title = title;
    program.room_code = room_code;
    await this.programRepo.updateProgram(program);
  }
}