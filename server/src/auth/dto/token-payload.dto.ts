import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsNotEmpty()
  @IsNumber()
  private readonly id: number;

  @IsNotEmpty()
  @IsString()
  private readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  private readonly email: string;
}
