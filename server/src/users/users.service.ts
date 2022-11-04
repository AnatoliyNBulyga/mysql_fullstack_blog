import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  public async getUsers() {
    try {
      return this.userRepository.findAll();
    } catch (e) {
      console.log('e in getUsers');
      throw new HttpException('Users was not found', 401);
    }
  }

  public async getUser(username: string) {
    try {
      return await this.userRepository.findOne({ where: { username } });
    } catch (e) {
      console.log('e in getUser');
      throw new HttpException(`Something was wrong`, 400);
    }
  }

  public async createUser(registeredData: CreateUserDto) {
    try {
      return await this.userRepository.create(registeredData);
    } catch (e) {
      console.log('e in createUser');
      throw new BadRequestException();
    }
  }
}
