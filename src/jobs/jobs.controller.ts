import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import {
  GetPaginateInfo,
  ResponseMessage,
  User,
} from 'src/decorator/customize';
import { IUser } from 'src/interface/users.interface';
import { checkValidId } from 'src/core/id.guard';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('jobs')
@Controller({ path: 'jobs', version: '1' })
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @ResponseMessage('Create a Job')
  handleCreate(@Body() createJobDto: CreateJobDto, @User() user: IUser) {
    return this.jobsService.create(createJobDto, user);
  }

  @Get()
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ResponseMessage('Get a list of Jobs')
  handleFindAll(@GetPaginateInfo() paginateInfo: PaginateInfo) {
    return this.jobsService.findAll(paginateInfo);
  }

  @Get(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Get a Job')
  handleFindOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Update a Job')
  handleUpdate(
    @Param('id') id: string,
    @Body() updateJobDto: UpdateJobDto,
    @User() user: IUser,
  ) {
    return this.jobsService.update(id, updateJobDto, user);
  }

  @Delete(':id')
  @UseGuards(checkValidId)
  @ResponseMessage('Delete a Job')
  handleRemove(@Param('id') id: string, @User() user: IUser) {
    return this.jobsService.remove(id, user);
  }
}
