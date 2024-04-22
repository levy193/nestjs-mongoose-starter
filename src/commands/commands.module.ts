import { Module } from '@nestjs/common';
import { SeederService } from './seeder';
import { UsersModule } from '#modules/users';

@Module({
  imports: [UsersModule],
  providers: [SeederService],
})
export class CommandsModule {}
