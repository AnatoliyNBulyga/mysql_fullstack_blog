import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './posts.entity';
import { PostDto } from './dto/post.dto';
import { FilesService } from '../files/files.service';
import { User } from '../users/users.entity';
import { IUser } from '../interfaces/users';
import { IPost } from '../interfaces/posts';
import { Op } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postRepository: typeof Post,
    private fileService: FilesService,
  ) {}

  public async getPosts(
    category: string,
    options = { page: 1, limit: 10 },
  ): Promise<{ count: number; rows: IPost[] }> {
    try {
      const { page, limit } = options;
      const offset = page * limit - limit;
      const posts = await this.postRepository.findAndCountAll({
        where: {
          cat: category ? category : { [Op.not]: null },
        },
        limit,
        offset,
      });

      if (!posts) {
        throw new HttpException(`Any posts were not found`, 404);
      }
      return posts;
    } catch (e) {
      console.log('e in getPosts ', e);
      throw new HttpException(
        e.response ?? `Something was wrong`,
        e.status ?? 400,
      );
    }
  }

  public async getPost(postId: number): Promise<IPost & { author: IUser }> {
    try {
      const post = await this.postRepository.findOne({
        where: { id: postId },
        include: User,
        raw: true,
        nest: true,
      });
      if (!post) {
        throw new HttpException(
          `Post with post id ${postId} was not found`,
          404,
        );
      }
      console.log('post ', post);
      return post;
    } catch (e) {
      console.log('e in getPost ', e);
      throw new HttpException(
        e.response ?? `Something was wrong with post id ${postId}`,
        e.status ?? 400,
      );
    }
  }

  public async createPost({
    post,
    userId,
    img,
  }: {
    post: PostDto;
    userId: number;
    img: any;
  }): Promise<IPost> {
    try {
      const imageName = await this.fileService.createFile(img);
      const created = await this.postRepository.create({
        ...post,
        img: imageName,
        uid: userId,
      });
      if (!created) {
        throw new BadRequestException();
      }
      return created;
    } catch (e) {
      console.log('e in createPost ', e);
      throw new HttpException(
        e.response ?? `Unable to create post`,
        e.status ?? 400,
      );
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
  }): Promise<number[]> {
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
      throw new HttpException(
        e.response ?? `Unable to update post`,
        e.status ?? 400,
      );
    }
  }

  public async deletePost(postId: number, userId: number) {
    try {
      const deleted = await this.postRepository.destroy({
        where: {
          id: postId,
          uid: userId, // If uid is not matching, it will return 0
        },
      });
      console.log('deleted ', deleted);
      if (!deleted) {
        throw new BadRequestException();
      }
      return deleted;
    } catch (e) {
      console.log('e in deletePost ', e);
      throw new HttpException(
        e.response ??
          `Unable to delete post with post id ${postId} and user id ${userId}`,
        e.status ?? 400,
      );
    }
  }
}
