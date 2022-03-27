import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [UserModule, DatabaseModule],
})
export class AppModule {}
