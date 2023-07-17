import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    return await this.prismaService.user.create({
      data: CreateUserDto,
    });
  }
}
