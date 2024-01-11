import { DataSource } from "typeorm";
import { Program } from "../database/entities/Program.entity";

export type TProgram = {
  id: number; title: string; room_code: string;
}

export interface IProgramRepo {
  getProgram(idProgram: number): Promise<TProgram[]>
  deleteProgram(idProgram: number): Promise<TProgram[]>
  createProgram(idProgram: number, title: string, room_code: string): Promise<TProgram[]>
  updateProgram(idProgram: number, title: string, room_code: string): Promise<TProgram[]>
}

export class ArrayPostgresRepo implements IProgramRepo {
  private readonly array: TProgram[] = [ { id: 1, title: 'Test', room_code: 'Test' }, { id: 2, title: 'Test', room_code: 'Test' } ]
  async getProgram(idProgram: number) {
      return this.array.sort((a, b) => a.id - b.id)
  }
  async deleteProgram(idProgram: number) {
    return this.array.sort((a, b) => a.id - b.id)
  }
  async createProgram(idProgram: number, title: string, room_code: string) {
    return this.array.sort((a, b) => a.id - b.id)
  }
  async updateProgram(idProgram: number, title: string, room_code: string) {
    return this.array.sort((a, b) => a.id - b.id)
  }
}

export class ProgramsRepo {
  constructor(private readonly connection: DataSource) {}

  async getProgram(idProgram: number) {
    const programs = await this.connection
      .createQueryBuilder(Program, "program")
      .where("program.id = :idProgram", { idProgram })
      .getOne();
    return programs;
  }

  async deleteProgram(program: Program) {
    // await this.connection.createQueryBuilder(Program, 'p').where('p.id = :idProgram', { idProgram }).delete()
    await this.connection.getRepository(Program).remove(program);
  }

  async createProgram(program: Program) { 
    await this.connection.createEntityManager().save(program);
  }

  async updateProgram(program: Program) { 
    await this.connection.createEntityManager().save(program);
  }
}