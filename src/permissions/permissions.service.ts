import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Permission } from './schemas/permission.schema';
import { PermissionDocument } from './schemas/permission.schema';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name) private readonly permissionModel: SoftDeleteModel<PermissionDocument>
  ) {}

  async create(createPermissionDto: CreatePermissionDto) : Promise<PermissionDocument> {
    return await this.permissionModel.create(createPermissionDto);
  }

  async findAll(currentPage: number, limit: number, queryString: string) {
    const { filter, sort, projection, population } = aqp(queryString);
    delete filter.page;
    delete filter.limit;

    const defaultLimit = limit || 10;
    const offset = (currentPage - 1) * defaultLimit;

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
            totalPages: totalPages,
            currentPage: currentPage
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
