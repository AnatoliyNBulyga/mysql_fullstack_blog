import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { Post } from '../posts/posts.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Post])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
