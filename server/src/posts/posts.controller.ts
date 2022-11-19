import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { JwtAccessGuard } from '../auth/guards/jwt-access.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/users.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  public async getPosts(@Query('cat') category: string) {
    return await this.postsService.getPosts(category);
  }

  @Get(':postId')
  public async getPost(@Param('postId') postId: number) {
    return await this.postsService.getPost(Number(postId));
  }

  @UseGuards(JwtAccessGuard)
  @Post()
  @UseInterceptors(FileInterceptor('img'))
  public async createPost(
    @GetUser() user: User,
    @Body() post: PostDto,
    @UploadedFile() img,
    @Res() res,
  ) {
    await this.postsService.createPost({ post, userId: user.id, img });
    return res
      .status(200)
      .json({ success: true, message: 'The post has been created' });
  }

  @UseGuards(JwtAccessGuard)
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
    return res
      .status(200)
      .json({ success: true, message: 'The post has been updated' });
  }

  @UseGuards(JwtAccessGuard)
  @Delete(':postId')
  public async deletePost(
    @GetUser() user: User,
    @Param('postId') postId: string,
    @Res() res,
  ) {
    await this.postsService.deletePost(Number(postId), Number(user.id));
    return res
      .status(200)
      .json({ success: true, message: 'The post has been deleted' });
  }
}
