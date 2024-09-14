import { Module } from '@nestjs/common';
import { DataExamplesService } from './data-examples.service';
import { DataExamplesController } from './data-examples.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/companies/schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Company.name,
        schema: CompanySchema
      },
    ]),
  ],
  controllers: [DataExamplesController],
  providers: [DataExamplesService]
})
export class DataExamplesModule {}
