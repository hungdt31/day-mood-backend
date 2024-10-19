import { Module } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { ResumesController } from './resumes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { Resume, ResumeSchema } from './schemas/resume.entity';

@Module({
  imports: [
    FilesModule,
    MongooseModule.forFeature([
      {
        name: Resume.name,
        schema: ResumeSchema,
      },
    ]),
  ],
  controllers: [ResumesController],
  providers: [ResumesService]
})
export class ResumesModule {}
