import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save({
      full_name: createUserDto.full_name,
      email: createUserDto.email,
      hashed_password: createUserDto.hashed_password,
      job: '',
      avatar_url: '',
    });
  }

  async findExistingEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async findUserById(id: string): Promise<User> {
    return await this.usersRepository.findOneBy({ id });
  }

  async updateVerification(id: string, is_verified: boolean) {
    return await this.usersRepository.update(id, { is_verified: is_verified });
  }
}
