import { Module } from '@nestjs/common';
import { TypeormConnectionProvider } from './TypeormConnection';

@Module({
  providers: [TypeormConnectionProvider],
  exports: [TypeormConnectionProvider],
})
export class DatabaseModule {}
