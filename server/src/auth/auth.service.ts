import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/register.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { TokenPayload } from './interfaces/access-token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: CreateUserDto) {
    try {
      // CHECK EXISTING USER
      const candidate = await this.userService.getUser(registrationData.email);
      if (candidate) {
        new HttpException(
          `User with email ${registrationData.email} is exist`,
          400,
        );
      }
      // Hash the password and creat a user
      const salt = bcrypt.genSaltSync(8);
      const hash = await bcrypt.hash(registrationData.password, salt);
      return await this.userService.createUser({
        ...registrationData,
        password: hash,
      });
    } catch (e) {
      console.log('ERROR in register ', e);
      throw new BadRequestException();
    }
  }

  public async getAuthUser(username: string, password: string) {
    try {
      const user = await this.userService.getUser(username);
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (e) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    console.log('isPasswordMatching ', isPasswordMatching);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtAccessToken(payload: TokenPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION_TIME'),
    });
    const accessTokenCookie = `Authentication=${accessToken}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_ACCESS_EXPIRATION_TIME',
    )}`;
    return { accessToken, accessTokenCookie };
  }
}
