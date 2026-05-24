import { Body, Controller, Param, Post, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos';
import { FollowDto } from './dtos/follow.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Return newly created user',
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Recommend Resturants For A User' })
  @ApiResponse({
    status: 200,
    description: 'Return recommendations',
  })
  @Get(':id/recommend')
  recommend(@Param('id') id: string) {
    return this.usersService.recommend(id);
  }

  @Post('/follow')
  follow(@Body() followDto: FollowDto) {
    return this.usersService.follow(followDto);
  }
}
