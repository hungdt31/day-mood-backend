import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import {
  GetPaginateInfo,
  Public,
  ResponseMessage,
  User,
} from 'src/decorator/customize';
import { IUser } from '../interface/users.interface';
import { UniqueGmail } from 'src/auth/gmail.guard';
import { checkValidId } from 'src/core/id.guard';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(UniqueGmail)
  @ResponseMessage('Create a user')
  create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    // tag Body = request.body
    // @Body là một overloading decorator, nó giúp chúng ta lấy dữ liệu từ request body ở nhiều kiểu dữ liệu khác nhau
    // như string, number, object, array, ...
    return this.usersService.create(createUserDto, user);
  }

  // lấy thông tin của người dùng có phân trang
  @Get()
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ResponseMessage('Get a list of users')
  findAll(@GetPaginateInfo() info: PaginateInfo) {
    return this.usersService.findAll(info);
  }

  // lấy thông tin của 1 người dùng
  @Public()
  @Get(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Get a user')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // chỉnh sửa thông tin người dùng
  @Patch(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Update a user')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  // đưa một người dùng vào thùng rác
  @Delete(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Take a user to trash')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
