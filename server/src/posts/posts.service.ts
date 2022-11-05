import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.entity';
import { PostDto } from './dto/post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postRepository: typeof Post,
    private userSevice: UsersService,
  ) {}

  public async getPosts(options = { page: 1, limit: 10 }) {
    try {
      const { page, limit } = options;
      const offset = page * limit - limit;

      return await this.postRepository.findAndCountAll({
        limit,
        offset,
      });
    } catch (e) {
      console.log('e in getPosts ', e);
      throw new HttpException(`Something was wrong`, 400);
    }
  }

  public async getPost(postId: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { id: postId },
        raw: true,
      });
      console.log('post ', post);
      const user = await this.userSevice.getUserById(post.uid);
      return {
        id: post.id,
        title: post.title,
        desc: post.desc,
        img: post.img,
        cat: post.cat,
        date: post.date,
        userImg: user.img,
        username: user.username,
      };
    } catch (e) {
      console.log('e in getPost ', e);
      throw new HttpException(
        `Something was wrong with post id ${postId}`,
        400,
      );
    }
  }

  public async createPost(post: PostDto, userId: number) {
    try {
      const created = await this.postRepository.create({
        ...post,
        uid: userId,
      });
      console.log('created ', created);
      return created;
    } catch (e) {
      console.log('e in createPost ', e);
      throw new HttpException(`Unable to create post`, 400);
    }
  }

  public async updatePost({
    post,
    postId,
    userId,
  }: {
    post: PostDto;
    postId: number;
    userId: number;
  }) {
    try {
      const updated = await this.postRepository.update(
        {
          ...post,
        },
        {
          where: {
            id: postId,
            uid: userId,
          },
        },
      );
      if (!updated) {
        throw new BadRequestException();
      }
      return updated;
    } catch (e) {
      console.log('e in updatePost ', e);
      throw new HttpException(`Unable to update post`, 400);
    }
  }

  public async deletePost(postId: number, userId: number) {
    try {
      const deleted = await this.postRepository.destroy({
        where: {
          id: postId,
          uid: userId,
        },
      });
      console.log('deleted ', deleted);
      if (!deleted) {
        throw new BadRequestException();
      }
      console.log('!deleted 2');
      return deleted;
    } catch (e) {
      console.log('e in deletePost ', e);
      throw new HttpException(
        `Unable to delete post with post id ${postId} and user id ${userId}`,
        400,
      );
    }
  }
}
