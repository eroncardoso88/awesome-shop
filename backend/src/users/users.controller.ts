import { Controller, Get, Post, Body, Patch, Param, Delete, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody } from '@nestjs/swagger';
import { UserEntity } from 'src/database/user.entity';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Controller('users')
export class UsersController implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'user',
        brokers: [
          'localhost:9092'
        ]
      },
      consumer: {
        groupId: 'user-consumer',
        allowAutoTopicCreation: true,
      }
    }
  })
    
  private client: ClientKafka;

  async onModuleInit() {
    const requestPatterns = [
      'create-user',
      'find-all-user',
      'find-by-name',
      'find-one-user',
      'update-user',
      'delete-user',
    ]

    requestPatterns.forEach(async pattern => {
      this.client.subscribeToResponseOf(pattern)
      await this.client.connect()
    })
  }

  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiBody({type: CreateUserDto})
  create(@Body() createUserDto: CreateUserDto): Observable<UserEntity> {
    return this.client.send('create-user', createUserDto)
  }

  @Get()
  index(): Observable<UserEntity[]> {
    return this.client.send('find-all-user', {})
  }

  @Get()
  getByName(@Param() userNameSubstring: string): Observable<UserEntity[]> {
    return this.client.send('find-by-name', userNameSubstring)
  }

  @Get(':id')
  findOneUser(@Param('id') id: string): Observable<UserEntity> {
    return this.client.send('find-one-user', id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Observable<UserEntity> {
    return this.client.send('update-user', {id, updateUserDto})
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<UserEntity> {
    return this.client.send('delete-user', id)
  }
}
