import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/interface/users.interface';
import { PaginateInfo } from 'src/interface/paginate.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>,
  ) {}

  async create(createRoleDto: CreateRoleDto, user: IUser) {
    return await this.roleModel.create({
      ...createRoleDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findRoleByName(name: string) {
    return await this.roleModel.findOne({ name });
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
    const totalItems = (await this.roleModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);

    return await this.roleModel
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
            totalRoles: +totalItems,
            roleCount: data.length,
            rolesPerPage: defaultLimit,
            totalPages,
            currentPage,
          },
          result: data,
        };
      });
  }

  async findOne(id: string) {
    // use populate to get all permissions of this role
    return await this.roleModel
      .findById(id)
      .populate({ path: 'permissions', select: 'apiPath method name module' });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto, user: IUser) {
    return this.roleModel.updateOne(
      {
        _id: id,
      },
      {
        ...updateRoleDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    const foundRole = await this.roleModel.findById(id);
    if (foundRole.name === 'ADMIN') {
      throw new BadRequestException("Can't remove admin role");
    }
    await this.roleModel.updateOne(
      {
        _id: id,
      },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.roleModel.softDelete({
      _id: id,
    });
  }
}
