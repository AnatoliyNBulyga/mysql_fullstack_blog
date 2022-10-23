import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/users.entity';
import { Post } from './posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private userRepository: typeof Post,
  ) {}

  public async getPosts() {}
}
