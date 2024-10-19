import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

// ở SQL document = table
export type CompanyDocument = HydratedDocument<Company>;

@Schema({ timestamps: true })
export class Company {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  industry: string;

  @Prop()
  description: string;

  @Prop({ type: Object })
  logo: {
    _id: mongoose.Schema.Types.ObjectId;
    filename: string;
    folderType: string;
  };

  // Add the images field here to store an array of image files
  @Prop({ type: [{ _id: mongoose.Schema.Types.ObjectId, filename: String, folderType: String }] })
  covers: {
    _id: mongoose.Schema.Types.ObjectId;
    filename: string;
    folderType: string;
  }[];

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

export const CompanySchema = SchemaFactory.createForClass(Company);
