import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Job, JobDocument } from './schemas/job.schema';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private readonly jobModel: SoftDeleteModel<JobDocument>,
  ) {}
  async create(createJobDto: CreateJobDto, user: IUser) {
    let { startDate, endDate } = createJobDto;
    if (!startDate) startDate = new Date();
    if (!endDate) endDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const isStartDateBeforeEndDate = startDate.getTime() < endDate.getTime();
    if (!isStartDateBeforeEndDate) {
      throw new BadRequestException('Start date must be before end date');
    }
    const job = await this.jobModel.create({
      ...createJobDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return {
      _id: job._id,
      createdAt: job.createdAt,
    };
  }

  async findAll(paginateInfo: PaginateInfo) {
    const {
      offset,
      defaultLimit,
      sort,
      projection,
      population,
      filter,
      currentPage,
    } = paginateInfo;
    const totalItems = (await this.jobModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);

    return await this.jobModel
      .find(filter)
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
            totalJobs: +totalItems,
            jobCount: data.length,
            jobsPerPage: defaultLimit,
            totalPages,
            currentPage,
          },
          result: data,
        };
      });
  }

  async findOne(id: string) {
    return await this.jobModel.findById(id);
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    return await this.jobModel.updateOne(
      { _id: id },
      {
        ...updateJobDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    await this.jobModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.jobModel.softDelete({ _id: id });
  }
}
