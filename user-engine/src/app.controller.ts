import { Controller, Get, Logger, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './interfaces/user.entity'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name)

  // const requestPatterns = [
  //   'create-user',
  //   'find-all-user',
  //   'find-by-name',
  //   'find-one-user',
  //   'update-user',
  //   'delete-user',
  // ]

  @MessagePattern('find-all-user')
  async index(): Promise<UserEntity[]> {
    return await this.appService.findAll();
  }

  @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<UserEntity> {
    this.logger.log(`User: ${JSON.stringify(data)}`)
    return await this.appService.create(data.value);
  }

  @MessagePattern('find-by-name')
  async findByName(@Param(':id') id: number): Promise<UserEntity> {
    this.logger.log(`User: ${id}`)
    return await this.appService.findOne(id);
  }
}
