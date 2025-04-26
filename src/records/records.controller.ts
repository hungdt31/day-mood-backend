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
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
//import { UseGuards } from '@nestjs/common';
import {
  GetPaginateInfo,
  Public,
  ResponseMessage,
} from 'src/decorator/customize';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('records')
@Controller({ path: 'records', version: '1' })
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ResponseMessage('Create a record')
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ResponseMessage('Get a list of records')
  findAll(@GetPaginateInfo() info: PaginateInfo) {
    return this.recordsService.findAll(info);
  }

  @Public()
  @Get(':id')
  @ResponseMessage('Get a record')
  findOne(@Param('id') id: string) {
    return this.recordsService.findOne(id);
  }

  @Patch(':id')
  //@UseGuards(checkValidId)
  @ResponseMessage('Update a record')
  update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
    //@User() user: IUser,
  ) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @Delete(':id')
  //@UseGuards(checkValidId)
  @ResponseMessage('Take a record to trash')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }
}
