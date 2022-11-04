import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/users.entity';

@UseGuards(JwtAccessGuard)
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  public async getPosts() {
    return await this.postsService.getPosts();
  }

  @Post()
  public async createPost(
    @GetUser() user: User,
    @Body() post: PostDto,
    @Res() res,
  ) {
    console.log('user ', user);
    await this.postsService.createPost(post, user.id);
    return res.status(200).send('The post has been created');
  }

  @Put(':postId')
  public async updatePost(
    @GetUser() user: User,
    @Param('postId') postId: string,
    @Body() post: PostDto,
    @Res() res,
  ) {
    await this.postsService.updatePost({
      post,
      postId: Number(postId),
      userId: Number(user.id),
    });
    return res.status(200).send('The post has been updated');
  }

  @Delete(':postId')
  public async deletePost(
    @GetUser() user: User,
    @Param('postId') postId: string,
    @Res() res,
  ) {
    await this.postsService.deletePost(Number(postId), Number(user.id));
    return res.status(200).send('The post has been deleted');
  }
}
