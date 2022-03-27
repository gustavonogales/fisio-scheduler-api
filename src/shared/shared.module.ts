import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { HashModule } from './hash/hash.module';

@Module({
  imports: [DatabaseModule, HashModule],
  exports: [DatabaseModule, HashModule],
})
export class SharedModule {}
