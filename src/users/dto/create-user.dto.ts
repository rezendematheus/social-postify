import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsEmail()
    email: string;
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;
    @IsString()
    avatar: string;
  }
  