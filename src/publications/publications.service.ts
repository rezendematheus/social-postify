import { ConflictException, Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { TokenPayload } from 'src/auth/entities/auth.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PublicationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createPublicationDto: CreatePublicationDto,
    tokenPayload: TokenPayload,
  ) {
    const existentPubli = await this.prismaService.publication.findFirst({
      where: {
        title: createPublicationDto.title,
      },
    });
    
    if (existentPubli) throw new ConflictException();
    return this.prismaService.publication.create({
      data: { ...createPublicationDto, userId: tokenPayload.userId },
    });
  }

  async findAll(tokenPayload: TokenPayload) {
    return await this.prismaService.publication.findMany({
      where: {
        userId: tokenPayload.userId,
      },
    });
  }
}
