import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  @IsString()
  @IsNotEmpty()
  readonly cat: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly img?: string;
}
