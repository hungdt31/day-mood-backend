import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { GetPaginateInfo, ResponseMessage, User } from 'src/decorator/customize';
import { ExistPermission } from './permissions.guard';
import { checkValidId } from 'src/core/id.guard';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller({ path: 'permissions', version: '1' })
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @UseGuards(ExistPermission)
  @ResponseMessage('Create permission successfully')
  create(
    @Body() createPermissionDto: CreatePermissionDto,
    @User() user: IUser
  ) {
    return this.permissionsService.create(createPermissionDto, user);
  }

  @Get()
  @ResponseMessage("Fetch list of permissions with pagination")
  findByPagination(
    @GetPaginateInfo() info: PaginateInfo
  ) {
    return this.permissionsService.findAll(info);
  }

  @Get(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Get permission successfully')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Update permission successfully')
  update(
    @Param('id') id: string, 
    @Body() updatePermissionDto: UpdatePermissionDto,
    @User() user: IUser
  ) {
    return this.permissionsService.update(id, updatePermissionDto, user);
  }

  @Delete(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Remove permission successfully')
  remove(
    @Param('id') id: string, 
    @User() user: IUser
  ) {
    return this.permissionsService.remove(id, user);
  }
}
