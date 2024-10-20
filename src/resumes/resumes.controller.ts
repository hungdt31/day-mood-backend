import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/interface/users.interface';
import { User, GetPaginateInfo } from 'src/decorator/customize';
import { checkValidId } from 'src/core/id.guard';
import { ApiTags } from '@nestjs/swagger';
import { PaginateInfo } from 'src/interface/paginate.interface';

@ApiTags('resumes')
@Controller({ path: 'resumes', version: '1' })
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @ResponseMessage('Upload a resume successfully!')
  create(
    @Body() createResumeDto: CreateResumeDto,
    @User() user: IUser
  ) {
    return this.resumesService.create(createResumeDto, user);
  }

  @Get()
  @ResponseMessage('Get resumes successfully!')
  findAll(
    @GetPaginateInfo() paginateInfo: PaginateInfo
  ) {
    return this.resumesService.findAll(paginateInfo);
  }

  @Patch(':id')
  @ResponseMessage('Update a resume successfully!')
  @UseGuards(checkValidId)
  update(
    @Param('id') id: string, 
    @Body() updateResumeDto: UpdateResumeDto,
    @User() user: IUser
  ) {
    return this.resumesService.update(id, updateResumeDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Delete a resume successfully!')
  @UseGuards(checkValidId)
  remove(@Param('id') id: string) {
    return this.resumesService.remove(id);
  }
}
