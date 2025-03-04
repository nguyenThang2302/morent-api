import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsEmailExisted } from 'src/api/common/decorators/is-email-existed';
import { IsValidPassword } from 'src/api/utils/helpers';

export class CreateAuthDto {
  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true,
  })
  @IsNotEmpty({ message: 'FIELD-0001' })
  @IsEmail({}, { message: 'FIELD-0003' })
  @IsEmailExisted({ message: 'FIELD-0010' })
  email: string;

  @ApiProperty({
    example: 'Test1234@',
    required: true,
  })
  @IsNotEmpty({ message: 'FIELD-0001' })
  @IsString({ message: 'FIELD-0002' })
  @IsValidPassword()
  password: string;

  @ApiProperty({
    example: 'Nguyen Van Thang',
    required: true,
  })
  @IsNotEmpty({ message: 'FIELD-0001' })
  @IsString({ message: 'FIELD-0002' })
  full_name: string;
}
