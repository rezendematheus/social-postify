import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const userExists = await this.usersService.findOne(createAuthDto.email);
    if (userExists) throw new ConflictException();

    const hashPwd = bcrypt.hashSync(createAuthDto.password, 10);
    const newUser = await this.usersService.create({
      ...createAuthDto,
      password: hashPwd,
    });

    const payload: TokenPayload = {
      userId: newUser.id,
      userEmail: newUser.email,
      issuer: 'Rezende',
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersService.findOne(loginAuthDto.email);
    if (!user) throw new NotFoundException();
    const isPasswordCorrect = bcrypt.compareSync(
      loginAuthDto.password,
      user.password,
    );
    if (!isPasswordCorrect) throw new UnauthorizedException();
    const payload = { userId: user.id, userEmail: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
