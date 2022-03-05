import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './interfaces/user.entity';
import { User } from './interfaces/user.interface'
import { Repository } from 'typeorm';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private userReporitory: Repository<UserEntity>
  ) {}
  
  async create(createUserDto: User): Promise<UserEntity> {
    return await this.userReporitory.save(createUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userReporitory.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, User: User) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
