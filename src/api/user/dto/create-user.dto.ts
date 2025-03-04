import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'ERR-0002' })
  full_name: string;

  @IsEmail({}, { message: 'ERR-0003' })
  email: string;

  @IsString({ message: 'ERR-0002' })
  hashed_password: string;
}
