import {
  Body,
  Controller,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Req() req: any, @Body() registrationData: CreateUserDto) {
    const registeredUser = await this.authService.register(registrationData);
    console.log(registeredUser, 'registeredUser');
    req.res.status(200).send('User has been created!');
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@GetUser() user: User, @Res() res) {
    try {
      console.log('user after login ', user);
      const { accessTokenCookie } =
        this.authService.getCookieWithJwtAccessToken({
          id: user.id,
          username: user.username,
          email: user.email,
        });
      res.setHeader('Set-Cookie', [accessTokenCookie]);
      res.status(200).json({
        secureUser: user,
      });
    } catch (e) {
      console.log('Error in login controller ', e);
      return new UnauthorizedException();
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('logout')
  async logout(@GetUser() user: User, @Res() res) {
    console.log('user after logout ', user);

    res.status(200).send('Logout is success!');
  }
}
