import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { HashModule } from './hash/hash.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, HashModule, AuthModule],
  exports: [DatabaseModule, HashModule, AuthModule],
})
export class SharedModule {}
