import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { RegisterDto } from 'src/auth/dto/create-user.dto';
import { IUser } from '../interface/users.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecordsService {
  constructor(private prismaService: PrismaService) {}

  getHashedPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);
    return hashedPassword;
  };

  async create(createRecordDto: CreateRecordDto) {
    try {
      await this.prismaService.$queryRaw`
        INSERT INTO moods ("name", "updated_time") VALUES(
          ${createRecordDto.mood},
          CURRENT_TIMESTAMP
        );
        `;
      const mood = await this.prismaService.$queryRaw<any>`
        SELECT "id" FROM moods
        ORDER BY "id" DESC
        LIMIT 1;
        `;

      const result = await this.prismaService.$queryRaw`
        INSERT INTO records ("title", "content", "updated_time", "mood_id", "user_id") VALUES (
          ${createRecordDto.title},
          ${createRecordDto.content},
          -- ${createRecordDto.status},
          CURRENT_TIMESTAMP,
          ${mood[0].id},
          ${createRecordDto.user_id}
        );
          `;
      return mood;
    } catch (error) {
      throw new BadRequestException('Error creating :' + error);
    }
  }

  async findAll(info: PaginateInfo) {
    const { skip, take, page, where } = info;

    try {
      const result = await this.prismaService.record.findMany({
        where,
      });

      const totalItems = result.length;
      const totalPages = Math.ceil(+totalItems / take);

      return {
        meta: {
          totalRecords: +totalItems,
          recordsCount: result.length,
          recordsPerPage: take,
          totalPages,
          currentPage: page,
        },
        result: result,
      };
    } catch (error) {
      throw new BadRequestException('Error finding :' + error);
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prismaService.$queryRaw<any>`
        SELECT * FROM records
        WHERE "id" = ${Number(id)}
        `;
      return result;
    } catch (error) {
      throw new BadRequestException('Error creating :' + error);
    }
  }

  async update(id: string, updateRecordDto: UpdateRecordDto) {
    try {
      let val: string = '';
      Object.keys(updateRecordDto).forEach((key) => {
        val += `"${key}" = ${
          typeof updateRecordDto[key] === 'number'
            ? updateRecordDto[key]
            : `'${updateRecordDto[key]}'`
        }`;
      });

      await this.prismaService
        .$queryRaw`UPDATE records SET "title" = '30/04/2025' WHERE "id" = ${Number(
        id,
      )};`;

      const result = await this.prismaService.$queryRaw<any>`
        SELECT * FROM records
        WHERE "id" = ${Number(id)}
        `;
      return result;
    } catch (error) {
      throw new BadRequestException('Error updating :' + error);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prismaService.$queryRaw<any>`
        SELECT * FROM records
        WHERE "id" = ${Number(id)}
        `;
      await this.prismaService.$queryRaw<any>`
      DELETE * FROM records
      WHERE "id" = ${Number(id)}
      `;

      return result;
    } catch (error) {
      throw new BadRequestException('Error updating :' + error);
    }
  }
}
