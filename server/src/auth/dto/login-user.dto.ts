import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  password: string;
}
