import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ExistRole } from './roles.guard';
import { IUser } from 'src/interface/users.interface';
import { GetPaginateInfo, ResponseMessage, User } from 'src/decorator/customize';
import { checkValidId } from 'src/core/id.guard';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller({ path: 'roles', version: '1' })
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @UseGuards(ExistRole)
  @ResponseMessage("Create a role")
  create(@Body() createRoleDto: CreateRoleDto, @User() user : IUser) {
    return this.rolesService.create(createRoleDto, user);
  }

  @Get()
  @ResponseMessage("Get a list of roles")
  findAll(
    @GetPaginateInfo() info : PaginateInfo
  ) {
    return this.rolesService.findAll(info);
  }

  @Get(':id')
  @UseGuards(checkValidId)
  @ResponseMessage("Get a role")
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(checkValidId)
  @ResponseMessage("Update a role")
  update(
    @Param('id') id: string, 
    @Body() updateRoleDto: UpdateRoleDto,
    @User() user: IUser
  ) {
    return this.rolesService.update(id, updateRoleDto, user);
  }

  @Delete(':id')
  @UseGuards(checkValidId)
  @ResponseMessage("Delete a role")
  remove(
    @Param('id') id: string,
    @User() user: IUser
  ) {
    return this.rolesService.remove(id, user);
  }
}
