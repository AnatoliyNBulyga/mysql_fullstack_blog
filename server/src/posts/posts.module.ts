import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/users.entity';
import { Post } from './posts.entity';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([Post, User]), FilesModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
