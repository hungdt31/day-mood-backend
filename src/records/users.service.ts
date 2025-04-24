import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserDocument } from './schemas/user.schema';
import { RegisterDto } from 'src/auth/dto/create-user.dto';
import { IUser } from '../interface/users.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
    // private prisma: PrismaService,
  ) {}

  getHashedPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  };

  async create(createUserDto: CreateUserDto, user: IUser) {
    const hashedMyPassword = this.getHashedPassword(createUserDto.password);
    delete createUserDto.password;
    let res = await this.userModel.create({
      password: hashedMyPassword,
      ...createUserDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return {
      _id: res._id,
      createdAt: res.createdAt,
    };
  }

  async register(registerDto: RegisterDto) {
    const { password } = registerDto;
    registerDto.password = this.getHashedPassword(password);
    let user = await this.userModel.create({
      ...registerDto,
    });
    delete user.password;
    return user;
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

    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(+totalItems / defaultLimit);

    return await this.userModel
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
            totalUsers: +totalItems,
            userCount: data.length,
            usersPerPage: defaultLimit,
            totalPages,
            currentPage,
          },
          result: data,
        };
      });
  }

  async findOne(id: string) {
    const res = await this.userModel
      .findOne({ _id: id, isDeleted: false })
      .select('-password')
      .populate({ path: 'role', select: 'name permissions' });

    if (!res) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return res;
  }

  async findOneByEmail(email: string) {
    return await this.userModel
      .findOne({ email })
      .populate({ path: 'role', select: 'name permissions' });
  }

  isValidPasword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return this.userModel.updateOne(
      { _id: id },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        }
      },
    );
  }

  async remove(id: string, user: IUser) {
    // update deletedBy with user action
    const foundUser = await this.userModel.findById(id);
    if (foundUser && foundUser.email === 'admin@gmail.com') {
      throw new BadRequestException("You can't delete admin account");
    }
    await this.userModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
    return await this.userModel.softDelete({ _id: id });
  }

  async updateUserToken(id: string, refreshToken: string) {
    return await this.userModel.updateOne(
      { _id: id },
      {
        refreshToken: refreshToken,
      },
    );
  }

  async findOneByRefreshToken(refreshToken: string) {
    return await this.userModel.findOne({ refreshToken });
  }
}
