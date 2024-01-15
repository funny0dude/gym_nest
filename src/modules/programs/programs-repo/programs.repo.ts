import { DataSource } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { Program } from '../../database/entities/Program.entity';
import { TYPEORM_CONNECTION } from '../../database/TypeormConnection';

export const PROGRAMS_REPO = 'PROGRAMS_REPO';

export interface IProgramRepo {
  getProgram(idProgram: number): Promise<Program | null>;
  deleteProgram(program: Program): Promise<void>;
  createProgram(program: Program): Promise<void>;
  updateProgram(program: Program): Promise<void>;
}

@Injectable()
export class ProgramRepo implements IProgramRepo {
  constructor(
    @Inject(TYPEORM_CONNECTION) private readonly connection: DataSource,
  ) {}

  async getProgram(idProgram: number) {
    const program = await this.connection
      .createQueryBuilder(Program, "program")
      .where("program.id = :idProgram", { idProgram })
      .getOne();
    return program;
  }

  async deleteProgram(program: Program) {
    await this.connection.getRepository(Program).remove(program);
  }

  async createProgram(program: Program) { 
    await this.connection.createEntityManager().save(program);
  }

  async updateProgram(program: Program) { 
    await this.connection.createEntityManager().save(program);
  }
}