import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { PermissionDocument } from './schemas/permission.schema';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private readonly permissionModel: SoftDeleteModel<PermissionDocument>
  ) {}

  async create(createPermissionDto: CreatePermissionDto, user: IUser) : Promise<PermissionDocument> {
    return await this.permissionModel.create({
      ... createPermissionDto,
      createdBy: {
        _id: user._id,
        email: user.email
      }
    });
  }

  async findAll(info : PaginateInfo) {
    const { offset, defaultLimit, sort, projection, population, filter, currentPage } = info;

    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);
    
    return await this.permissionModel.find(filter)
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
            totalPermissions: +totalItems,
            permissionCount: data.length,
            permissionsPerPage: defaultLimit,
            totalPages,
            currentPage
          },
          result: data
        }
      });
  }

  async findOne(id: string) : Promise<PermissionDocument> {
    return await this.permissionModel.findById(id);
  }

  async checkNewValidPermission(method: string, apiPath: string) : Promise<boolean> {
    // Check if the method and apiPath is unique
    const permission = await this.permissionModel.findOne({
      method,
      apiPath
    });
    return permission ? false : true;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto, user: IUser) {
    return await this.permissionModel.updateOne({
      _id: id
    }, {
      ... updatePermissionDto,
      updatedBy: {
        _id: user._id,
        email: user.email
      }
    })
  }

  async remove(id: string, user : IUser) {
    await this.permissionModel.updateOne({
      _id: id
    }, {
      deletedBy: {
        _id: user._id,
        email: user.email
      }
    })
    return this.permissionModel.softDelete({
      _id: id
    });
  }
}
