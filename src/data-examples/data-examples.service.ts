import { Injectable } from '@nestjs/common';
import { CreateDataExampleDto } from './dto/create-data-example.dto';
import { UpdateDataExampleDto } from './dto/update-data-example.dto';
import fs from 'fs';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from 'src/companies/schemas/company.entity';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import { Model } from 'mongoose';

@Injectable()
export class DataExamplesService {
  constructor(
    @InjectModel(Company.name) private readonly companyModel: SoftDeleteModel<CompanyDocument>,
    @InjectModel(Company.name) private readonly _companyModel: Model<Company>
  ) {}
  async create(
    createDataExampleDto: CreateDataExampleDto,
    user: IUser
  ) {
    fs.readFile('./data/companies.json', 'utf8', async (err, data) => {
      if (err) {
        console.error(err);
        return err;
      }
      // Parse the JSON data
      const records = await JSON.parse(data);
      for (let i = 0; i < records.length; i++) {
        await this.companyModel.create({
          ... records[i],
          createdBy: {
            _id: user._id,
            email: user.email
          }
        });
      }
    });
    return 'This action adds a new dataExample';
  }

  findAll() {
    return `This action returns all dataExamples`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dataExample`;
  }

  update(id: number, updateDataExampleDto: UpdateDataExampleDto) {
    return `This action updates a #${id} dataExample`;
  }

  async removeAll() {
    return await this._companyModel.deleteMany();
  }
}
