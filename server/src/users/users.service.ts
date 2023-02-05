import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from './users.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private readonly fileService: FilesService,
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
      return await this.userRepository.findOne({
        where: { username },
      });
    } catch (e) {
      console.log('e in getUser');
      throw new HttpException(`Something was wrong`, 400);
    }
  }

  public async getUserById(userId: number) {
    try {
      return await this.userRepository.findOne({ where: { id: userId } });
    } catch (e) {
      console.log('e in getUserById');
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

  public async getUserWithRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.getUserById(userId);
      const isRefreshTokenMatching = await bcrypt.compare(
        refreshToken,
        user.hashed_refresh_token,
      );
      if (!isRefreshTokenMatching) {
        throw new HttpException('Invalid refresh token', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (e) {
      console.log(e);
      throw new HttpException(
        e.response ?? `An unknown error occurred`,
        e.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async removeRefreshToken(userId: number) {
    try {
      const removeToken = await this.userRepository.update(
        {
          hashed_refresh_token: null,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      if (!removeToken) {
        throw new BadRequestException();
      }
      return removeToken;
    } catch (e) {
      console.log(e);
      return new HttpException(
        'An unknown error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async setCurrentRefreshToken(refreshToken: string, userId: number) {
    try {
      const currentHashedRefreshToken = await bcrypt.hash(refreshToken, 8);
      await this.userRepository.update(
        {
          hashed_refresh_token: currentHashedRefreshToken,
        },
        {
          where: {
            id: userId,
          },
        },
      );
      return true;
    } catch (e) {
      console.log(e);
      return new HttpException(
        'Set Refresh Token ERROR',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async updateUser(updateData: UpdateUserDto, user: User) {
    console.log('updateData service ', updateData);
    try {
      if (updateData.img) {
        await this.fileService.deleteOldFile(user.img);
      }
      const updated = await this.userRepository.update(
        {
          ...updateData,
        },
        {
          where: {
            id: user.id,
          },
        },
      );
      if (!updated) {
        throw new BadRequestException();
      }
      return updated;
    } catch (e) {
      console.log('e in updateUser');
      throw new BadRequestException();
    }
  }
}
