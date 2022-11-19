import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/register.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/users.entity';
import { JwtAccessGuard } from './guards/jwt-access.guard';
import { TokenPayload } from './interfaces/access-token-payload.interface';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { RequestWithUser } from './interfaces/request-with-user.inteface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Req() req: any, @Body() registrationData: CreateUserDto) {
    const registeredUser = await this.authService.register(registrationData);
    console.log(registeredUser, 'registeredUser');
    req.res.status(200).json({ success: true });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User, @Res() res) {
    try {
      console.log('user after login ', user);
      const payload: TokenPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };
      const { accessTokenCookie } =
        this.authService.getCookieWithJwtAccessToken(payload);
      const { refreshTokenCookie, refreshToken } =
        this.authService.getCookieWithJwtRefreshToken(payload);
      await this.usersService.setCurrentRefreshToken(refreshToken, user.id);
      res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);
      res.status(200).json({
        secureUser: user,
      });
    } catch (e) {
      console.log('Error in login controller ', e);
      return new UnauthorizedException();
    }
  }

  @UseGuards(JwtAccessGuard)
  @Post('logout')
  async logout(@GetUser() user: User, @Res() res) {
    console.log('user after logout ', user);
    const logoutCookie = await this.authService.logout(user.id);
    res.setHeader('Set-Cookie', logoutCookie);
    res.status(200).json({ success: true });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser, @GetUser() user: User) {
    const payload: TokenPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const { accessTokenCookie } =
      this.authService.getCookieWithJwtAccessToken(payload);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }
}
