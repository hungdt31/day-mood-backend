import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseFilePipeBuilder,
  HttpStatus,
  Headers,
  HttpException,
  UseGuards
} from '@nestjs/common';
import { FilesService } from './files.service';
import { GetPaginateInfo, User } from 'src/decorator/customize';
import { PaginateInfo } from 'src/interface/paginate.interface';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Express } from 'express';
import { ResponseMessage } from 'src/decorator/customize';
import { IUser } from 'src/interface/users.interface';
import { checkValidId } from 'src/core/id.guard';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('files')
@Controller({ path: 'files', version: '1' })
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // validate file type and size
  @Post('upload')
  @ResponseMessage('Upload file successfully!')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType:
            /^(image\/jpg|image\/jpeg|image\/png|text\/plain|application\/pdf|application\/vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Headers('folder_type') folder_type: string,
    @User() user: IUser,
  ) {
    if (!folder_type) {
      throw new HttpException(
        'Folder type is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.filesService.create(
      {
        mimetype: file.mimetype,
        name: file.filename,
        folderType: folder_type,
      },
      user,
    );
  }

  @Get()
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'limit' })
  @ResponseMessage('Get files successfully!')
  findAll(@GetPaginateInfo() info: PaginateInfo) {
    return this.filesService.findAll(info);
  }

  @Get(':id')
  @ResponseMessage('Get a file successfully!')
  @UseGuards(checkValidId)
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage('Update file successfully!')
  @UseGuards(checkValidId)
  update(
    @Param('id') id: string, 
    @Body() updateFileDto: UpdateFileDto, 
    @User() user: IUser
  ) {
    return this.filesService.update(id, updateFileDto, user);
  }

  @Delete(':id')
  @ResponseMessage('Remove file successfully!')
  @UseGuards(checkValidId)
  remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
