import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  GetPaginateInfo,
  ResponseMessage,
  User,
} from 'src/decorator/customize';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('companies')
@Controller({ path: 'companies', version: '1' })
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ResponseMessage('Create a new Company successfully!')
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  @Get()
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ResponseMessage('Fetch list of companies with pagination')
  findAll(@GetPaginateInfo() info: PaginateInfo) {
    return this.companiesService.findAll(info);
  }

  @Get(':id')
  @ResponseMessage('Get a Company successfully!')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  @ResponseMessage('Update a Company successfully!')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser,
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Remove a Company successfully!')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
