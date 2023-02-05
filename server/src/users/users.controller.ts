import {
  Body,
  Controller,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAccessGuard)
  @UsePipes(new ValidationPipe())
  @Put()
  public async updateUser(
    @Body() updateData: UpdateUserDto,
    @GetUser() user: User,
    @Res() res,
  ) {
    console.log('updateData ', updateData);
    await this.usersService.updateUser(updateData, user);
    return res
      .status(200)
      .json({ success: true, message: 'The user has been updated' });
  }
}
