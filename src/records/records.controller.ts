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
  ApiBody,
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
  @ApiBody({
      type: CreateRecordDto,
      description: 'User data to create'
    })
  @ApiResponse({ 
    status: 201, 
    description: 'Create a record successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 201 },
        message: { type: 'string', example: 'Create a record' },
        data: 
        { type: 'array',
          items:
          {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Một ngày đẹp trời' },
              content: { type: 'string', example: 'Đã làm được rất nhiều công việc.' },
              status: { type: 'string', example: 'ACTIVE' },
              created_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              updated_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              mood_id: { type: 'number', example: 12 },
              user_id: { type: 'number', example: 1 },
            },
          },
        }
      },
    }})

    @ApiResponse({
      status: 400,
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          message: { type: 'array', example: ['title must be a string']},
          error: { type: 'string', example: 'Bad Request' },
        },
      }})
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
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Get a list of records' },
        data: {
          type: 'object',
          properties: {
            meta: {
              type: 'object',
              properties: {
                totalRecords: { type: 'number', example: 1 },
                recordsPerPage: { type: 'number', example: 10 },
                totalPages: { type: 'number', example: 1 },
                currentPage: { type: 'number', example: 1 },
              },
            },
            items: {
              type: 'array',
              items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number', example: 1 },
                    title: { type: 'string', example: 'Một ngày đẹp trời' },
                    content: { type: 'string', example: 'Đã làm được rất nhiều công việc.' },
                    status: { type: 'string', example: 'ACTIVE' },
                    created_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
                    updated_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
                    mood_id: { type: 'number', example: 12 },
                    user_id: { type: 'number', example: 1 },
                  },
              },
            },
          },
        },
      },
    },
  })
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
  @ApiResponse({ status: 200, 
                 description: 'Record retrieved successfully',
                 schema: {
                  type: 'object',
                  properties: {
                    statusCode: { type: 'number', example: 200 },
                    message: { type: 'string', example: 'Get a record' },
                    data: {
                          type: 'array',
                          items: {
                              type: 'object',
                              properties: {
                                id: { type: 'number', example: 1 },
                                title: { type: 'string', example: 'Một ngày đẹp trời' },
                                content: { type: 'string', example: 'Đã làm được rất nhiều công việc.' },
                                status: { type: 'string', example: 'ACTIVE' },
                                created_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
                                updated_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
                                mood_id: { type: 'number', example: 12 },
                                user_id: { type: 'number', example: 1 },
                              },
                          },
                    },
                  },
                },
              })
  @ApiResponse({ status: 404, 
                 description: 'Record not found',
                 schema: {
                  type: 'object',
                  properties: {
                    statusCode: { type: 'number', example: 404 },
                    message: { type: 'string', example: 'Record not found' },
                  }
                 }

   })
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
  @ApiResponse({
    status: 200,
    description: 'Record updated successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Update a record' },
        data: 
        { type: 'array',
          items:
          {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Một ngày đẹp trời' },
              content: { type: 'string', example: 'Đã làm được rất nhiều công việc.' },
              status: { type: 'string', example: 'ACTIVE' },
              created_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              updated_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              mood_id: { type: 'number', example: 12 },
              user_id: { type: 'number', example: 1 },
            },
          },
        }
      },
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 400 },
        message: { type: 'array', example: ['title must be a string']},
        error: { type: 'string', example: 'Bad Request' },
      },
    }})
  @ApiResponse({
    status: 404,
    description: 'Record not found',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 404 },
        message: { type: 'string', example: 'Record not found' },
      },
    },
  })
  @ResponseMessage('Update a record')
  update(@Param('id') id: number, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(+id, updateRecordDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a record',
    description: 'Sends a record to trash',
  })
  @ApiParam({
    name: 'id',
    description: 'Record ID',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Record deleted successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Take a record to trash' },
        data: 
        { type: 'array',
          items:
          {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              title: { type: 'string', example: 'Một ngày đẹp trời' },
              content: { type: 'string', example: 'Đã làm được rất nhiều công việc.' },
              status: { type: 'string', example: 'ACTIVE' },
              created_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              updated_time: { type: 'string', example: '2023-01-01T00:00:00.000Z' },
              mood_id: { type: 'number', example: 12 },
              user_id: { type: 'number', example: 1 },
            },
          },
        }
      },
    },
  })
  @ApiResponse({ status: 404, 
    description: 'Record not found',
    schema: {
     type: 'object',
     properties: {
       statusCode: { type: 'number', example: 404 },
       message: { type: 'string', example: 'Record not found' },
     }
    }

  })
  @ResponseMessage('Take a record to trash')
  remove(@Param('id') id: number) {
    return this.recordsService.remove(+id);
  }
}
