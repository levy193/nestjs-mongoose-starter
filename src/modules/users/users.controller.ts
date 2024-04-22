import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { MongooseClassSerializerInterceptor, ROLES, Roles, RolesGuard } from '#common';
import { User } from '#entities/main';

@UseGuards(RolesGuard)
@Roles(ROLES.ADMIN)
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(User, true))
  @Get()
  paginate() {
    return this.usersService.paginate();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ _id: id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({ _id: id }, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ _id: id });
  }
}
