import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FileDocument, File } from './entities/file.entity';
import { Model } from 'mongoose';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { IUser } from 'src/interface/users.interface';

@Injectable()
export class FilesService {
  constructor(@InjectModel(File.name) private fileModel: Model<FileDocument>) {}

  async create(createFileDto: CreateFileDto, user: IUser) {
    return await this.fileModel.create({
      ...createFileDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async findAll(info: PaginateInfo) {
    const {
      offset,
      defaultLimit,
      sort,
      projection,
      population,
      filter,
      currentPage,
    } = info;

    const totalItems = (await this.fileModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);

    return await this.fileModel
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
            totalFiles: +totalItems,
            fileCount: data.length,
            filesPerPage: defaultLimit,
            totalPages,
            currentPage,
          },
          result: data,
        };
      });
  }

  async findOne(id: string) {
    return await this.fileModel.findOne({
      _id: id
    });
  }

  async update(id: string, updateFileDto: UpdateFileDto, user: IUser) {
    return await this.fileModel.updateOne({
      _id: id
    }, {
      ... updateFileDto,
      updatedBy: {
        _id: user._id,
        email: user.email,
      }
    });
  }

  async remove(id: string) {
    return await this.fileModel.deleteOne({
      _id: id
    });
  }
}
