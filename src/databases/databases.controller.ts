import { Controller } from '@nestjs/common';
import { DatabasesService } from './databases.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('databases')
@Controller({ path: 'databases', version: '1' })
export class DatabasesController {
  constructor(private readonly databasesService: DatabasesService) {}
}
