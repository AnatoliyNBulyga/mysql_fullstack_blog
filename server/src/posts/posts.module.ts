import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.entity';
import { Post } from './posts.entity';
import { UsersModule } from "../users/users.module";

@Module({
  imports: [SequelizeModule.forFeature([Post, User]), UsersModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
