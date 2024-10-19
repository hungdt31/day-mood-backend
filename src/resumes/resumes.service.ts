import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { FilesService } from 'src/files/files.service';
import { IUser } from 'src/interface/users.interface';
import { InjectModel } from '@nestjs/mongoose';
import { HistoryStatus, Resume, ResumeDocument } from './schemas/resume.entity';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';

@Injectable()
export class ResumesService {
  constructor(
    // private filesService: FilesService,
    @InjectModel(Resume.name)
    private readonly ResumeModel: SoftDeleteModel<ResumeDocument>,
  ) {}
  async create(createResumeDto: CreateResumeDto, user: IUser) {
    return await this.ResumeModel.create({
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

  async findAll(jobId: string, userId: string) {
    const query: any = {};

    if (jobId != "" && jobId != null) {
      query.jobId = jobId;
    }

    if (userId != "" && userId != null) {
      query.userId = userId;
    }
    
    return await this.ResumeModel.find(query);
  }

  async findOne(id: string) {
    return await this.ResumeModel.findById(id);
  }

  async update(id: string, updateResumeDto: UpdateResumeDto, user: IUser) {
    const resume = await this.ResumeModel.findById(id);
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
      const updatedResume = await this.ResumeModel.updateOne({
        _id: id
      }, {
        history: resume.history
      })
      return updatedResume;
    }
    if (updateResumeDto.status) delete updateResumeDto.status
    return await this.ResumeModel.updateOne({
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
    return await this.ResumeModel.softDelete({
      _id: id
    });
  }
}
