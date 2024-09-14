import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Permission } from 'src/permissions/schemas/permission.schema';
// ở SQL document = table
export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string

  @Prop({ required: true})
  description: string

  @Prop({ required: true, default: false })
  isActive: boolean
  // array of object id

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Permission.name }] })
  permissions: mongoose.Schema.Types.ObjectId[];

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
  refreshToken: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;

  @Prop()
  isDeleted: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
