import { Injectable, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync} from 'bcryptjs';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel : SoftDeleteModel<UserDocument>
  ) {}
  getHashedPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  }
  async create(createUserDto: CreateUserDto) {
    const { email , password , name } = createUserDto;
    const hashedMyPassword = this.getHashedPassword(password);
    let user = await this.userModel.create({
      email,
      password: hashedMyPassword,
      name
    });
    return {
      messege: "Create user success",
      user
    };
  }

  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return "Id is invalid";
    return await this.userModel.findOne({_id: id});
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({email});
  }

  isValidPasword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!mongoose.Types.ObjectId.isValid(id)) return "Id is invalid";
    return this.userModel.updateOne({_id: id}, updateUserDto);
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return "Id is invalid";
    return await this.userModel.softDelete({_id: id});
  }
}
