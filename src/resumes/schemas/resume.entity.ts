import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Job } from 'src/jobs/schemas/job.schema';

// ở SQL document = table
export type ResumeDocument = HydratedDocument<Resume>;

export enum HistoryStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

class UserInterface {
  _id: string;
  name: string;
}

@Schema({ timestamps: true })
export class Resume {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  message: string;

  @Prop({ type: Object, required: true })
  fileCv: {
    _id: mongoose.Schema.Types.ObjectId;
    filename: string;
    folderType: string;
  };

  @Prop({
    type: [
      {
        status: {
          type: String,
          enum: Object.values(HistoryStatus),
          required: true,
        },
        updatedAt: { type: Date, required: true },
        updatedBy: { type: Object, required: true },
      },
    ],
  })
  history: {
    status: HistoryStatus;
    updatedAt: Date;
    updatedBy: UserInterface;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Job.name })
  jobId: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Object })
  createdBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  updatedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object })
  deletedBy: {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  isDeleted: boolean;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);
