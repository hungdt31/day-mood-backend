import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { UniqueGmail } from 'src/auth/gmail.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(UniqueGmail)
  @ResponseMessage("Created a user")
  create(@Body() createUserDto: CreateUserDto, @User() user : IUser) {
    // tag Body = request.body
    // @Body là một overloading decorator, nó giúp chúng ta lấy dữ liệu từ request body ở nhiều kiểu dữ liệu khác nhau 
    // như string, number, object, array, ...
    return this.usersService.create(createUserDto, user);
  }

  // lấy thông tin của người dùng có phân trang
  @Get()
  @ResponseMessage("Got a number of users")
  findAll(
    @Query("page") currentPage: number,
    @Query("limit") limit: number,
    @Query() queryString: string
  ) {
    return this.usersService.findAll(+currentPage, +limit, queryString);
  }

  // lấy thông tin của 1 người dùng
  @Public()
  @Get(':id')
  @ResponseMessage("Got a user")
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // chỉnh sửa thông tin người dùng
  @Patch(':id')
  @ResponseMessage("Updated user")
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @User() user : IUser) {
    return this.usersService.update(id, updateUserDto, user);
  }

  // đưa một người dùng vào thùng rác
  @Delete(':id')
  @ResponseMessage("Took a user to trash")
  remove(@Param('id') id: string, @User() user : IUser) {
    return this.usersService.remove(id, user);
  }
}
