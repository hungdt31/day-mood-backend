import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from './schemas/company.entity';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name) private companyModel: SoftDeleteModel<CompanyDocument>
  ) {}
  async create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return await this.companyModel.create({
      ... createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, sort, projection, population } = aqp(queryString);
    delete filter.page;
    delete filter.limit;

    const offset = (currentPage - 1) * limit;
    const defaultLimit = limit || 10;

    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);

    return await this.companyModel.find(filter)
      // @ts-ignore: Unreachable code error
      .sort(sort)
      .skip(offset)
      .limit(defaultLimit)
      .select(projection)
      .populate(population)
      .exec()
      .then((data) => {
        return {
          meta: {
            totalItems: +totalItems,
            itemCount: data.length,
            itemsPerPage: defaultLimit,
            totalPages: totalPages,
            currentPage: currentPage
          },
          result: data
        }
      });
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne({_id: id}, {
      ...updateCompanyDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      },
      updatedAt: new Date()
    })
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.updateOne({_id: id}, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    });
    return await this.companyModel.softDelete({_id: id});
  }
}
