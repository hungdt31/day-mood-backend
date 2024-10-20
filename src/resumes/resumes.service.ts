import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { IUser } from 'src/interface/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { HistoryStatus, Resume, ResumeDocument } from './schemas/resume.entity';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}
  async create(createResumeDto: CreateResumeDto, user: IUser) {
    return await this.resumeModel.create({
      ... createResumeDto,
      createdBy: {
        _id: user._id,
        name: user.name
      },
      history: {
        status: 'PENDING',
        updatedAt: new Date(),
        updatedBy: {
          _id: user._id,
          name: user.name
        }
      }
    });
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
    } = paginateInfo

    const totalItems = (await this.resumeModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);

    return await this.resumeModel
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
            totalResumes: +totalItems,
            resumeCount: data.length,
            resumesPerPage: defaultLimit,
            totalPages,
            currentPage,
          },
          result: data,
        };
      });
  }

  async findOne(id: string) {
    return await this.resumeModel.findById(id);
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
    const resume = await this.resumeModel.findById(id);
    if (resume.userId.toString() == user._id && updateResumeDto.status) {
      throw new BadRequestException('Owner can not change status of Cv!');
    }
    else if (resume.userId.toString() != user._id) {
      resume.history.push({
        status: updateResumeDto.status,
        updatedAt: new Date(),
        updatedBy: {
          _id: user._id,
          name: user.name
        }
      })
      const updatedResume = await this.resumeModel.updateOne({
        _id: id
      }, {
        history: resume.history
      })
      return updatedResume;
    }
    if (updateResumeDto.status) delete updateResumeDto.status
    return await this.resumeModel.updateOne({
      _id: id
    }, { 
      history: {
        ... updateResumeDto,
        history: resume.history.push({
          status: HistoryStatus.PENDING,
          updatedAt: new Date(),
          updatedBy: {
            _id: user._id,
            name: user.name
          }
        })
      }
    });
  }

  async remove(id: string) {
    return await this.resumeModel.softDelete({
      _id: id
    });
  }
}
