import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DataExamplesService } from './data-examples.service';
import { CreateDataExampleDto } from './dto/create-data-example.dto';
import { UpdateDataExampleDto } from './dto/update-data-example.dto';
import { User } from 'src/decorator/customize';
import { IUser } from 'src/interface/users.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('data-examples')
@Controller({ path: 'data-examples', version: '1' })
export class DataExamplesController {
  constructor(private readonly dataExamplesService: DataExamplesService) {}

  @Post()
  create(
    @Body() createDataExampleDto: CreateDataExampleDto,
    @User() user: IUser,
  ) {
    return this.dataExamplesService.create(createDataExampleDto, user);
  }

  @Get()
  findAll() {
    return this.dataExamplesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataExamplesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataExampleDto: UpdateDataExampleDto,
  ) {
    return this.dataExamplesService.update(+id, updateDataExampleDto);
  }

  @Delete()
  remove() {
    return this.dataExamplesService.removeAll();
  }
}
