import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/register.dto';
import { RequestWithUser } from './interfaces/request-with-user.inteface';
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
  async login(@Req() req: RequestWithUser, @GetUser() user: User) {
    console.log('user after login ', user);
    const { accessTokenCookie } = this.authService.getCookieWithJwtAccessToken({
      id: user.id,
      username: user.username,
      email: user.email,
    });
    req.res.setHeader('Set-Cookie', [accessTokenCookie]);
    req.res.status(200).json({
      secureUser: user,
    });
  }
}
