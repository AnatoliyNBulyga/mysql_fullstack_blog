import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../../users/users.entity';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly desc: string;

  @IsString()
  @IsOptional()
  readonly img?: string;

  @IsString()
  @IsNotEmpty()
  readonly cat: string;

  @IsString()
  @IsNotEmpty()
  readonly date: string;
}
