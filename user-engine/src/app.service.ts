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

  async findOne(id: number):Promise<UserEntity> {
    return await this.userReporitory.findOneOrFail(id)
  }

  // async update(id: number, User: User):Promise<UserEntity> {
  //   return await this.userReporitory.update()
  // }

  // async remove(id: number):Promise<UserEntity> {
  //   return await this.userReporitory.find()
  // }
}
