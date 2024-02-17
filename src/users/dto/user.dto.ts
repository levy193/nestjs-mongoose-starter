import { Exclude, Transform } from 'class-transformer';

export class UserDto {
  @Exclude()
  __v: number;

  @Transform(({ value }) => value.toString())
  _id: string;

  username: string;

  fullName: string;

  email: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  passwordSalt: string;

  avatar: string;
}
