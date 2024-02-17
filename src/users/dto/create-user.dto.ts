import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MaxLength(50)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  avatar: string;
}
