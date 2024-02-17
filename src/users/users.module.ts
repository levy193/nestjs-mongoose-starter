import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UsersRepository } from '#repositories';
import { User, UserSchema } from '#entities/vstore';
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }], 'vstore')],
  controllers: [UsersController],
  providers: [
    {
      provide: 'UsersRepositoryInterface',
      useClass: UsersRepository,
    },
    UsersService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
