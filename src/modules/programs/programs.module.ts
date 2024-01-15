import { Module } from '@nestjs/common';
import { PROGRAMS_REPO, ProgramRepo } from './programs-repo/programs.repo';
import { ProgramController } from './programs-controller/programs.controller';
import { DatabaseModule } from '../database/database.module';
import {
  PROGRAMS_SERVICE,
  ProgramService,
} from './programs-service/programs.servive';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: PROGRAMS_REPO,
      useClass: ProgramRepo,
    },
    {
      provide: PROGRAMS_SERVICE,
      useClass: ProgramService,
    },
  ],
  controllers: [ProgramController],
})
export class ProgramsModule {}
