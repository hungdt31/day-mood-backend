import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/roles/schemas/role.schema';

// ở SQL document = table
export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {

  @Prop()
  name: string;

  @Prop({ type: Array })
  skills: string[];

  @Prop()
  location: string;

  @Prop()
  salary: string;
  
  @Prop()
  quantity: number;

  @Prop()
  level: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: new Date() })
  startDate: Date;

  // default 30 days
  @Prop({ default: new Date(new Date().setDate(new Date().getDate() + 30)) })
  endDate: Date;

  @Prop({ type: Object})
  company: {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
  };

  @Prop({ type: Object})
  createdBy : {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object})
  updatedBy : {
    _id: mongoose.Schema.Types.ObjectId;
    email: string;
  };

  @Prop({ type: Object})
  deletedBy : {
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

export const JobSchema = SchemaFactory.createForClass(Job);
