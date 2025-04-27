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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('records')
@ApiBearerAuth('token')
@Controller({ path: 'records', version: '1' })
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new record',
    description: 'Creates a new mood record in the system',
  })
  @ApiResponse({ status: 201, description: 'Record successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ResponseMessage('Create a record')
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordsService.create(createRecordDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all records',
    description: 'Retrieves a paginated list of records',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page',
    type: Number,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'List of records retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ResponseMessage('Get a list of records')
  findAll(@GetPaginateInfo() info: PaginateInfo) {
    return this.recordsService.findAll(info);
  }

  @Public()
  @Get(':id')
  @ApiOperation({
    summary: 'Get a record by ID',
    description: 'Retrieves a specific record by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Record retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ResponseMessage('Get a record')
  findOne(@Param('id') id: number) {
    return this.recordsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a record',
    description: 'Updates an existing record by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Record updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ResponseMessage('Update a record')
  update(@Param('id') id: number, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(+id, updateRecordDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a record',
    description: 'Sends a record to trash (soft delete)',
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Record moved to trash successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Record not found' })
  @ResponseMessage('Take a record to trash')
  remove(@Param('id') id: number) {
    return this.recordsService.remove(+id);
  }
}
