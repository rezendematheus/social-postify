import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TokenPayload } from 'src/auth/entities/auth.entity';
import { AuthenticatedRequest } from 'src/entities/authenticatedRequest';

@Controller('')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post('publication')
  create(@Body() createPublicationDto: CreatePublicationDto, @Request() req: AuthenticatedRequest) {
    return this.publicationsService.create(createPublicationDto, req.tokenPayload);
  }

  @UseGuards(AuthGuard)
  @Get('publications')
  findAll(@Request() req: AuthenticatedRequest) {
    return this.publicationsService.findAll(req.tokenPayload);
  }

}
