import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsMongoId, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty({
    type: [mongoose.Schema.Types.ObjectId],
    items: {
      type: 'string',
      format: 'uuid',
    },
    description: 'Array of permissions id',
    example: ['60e4c4d9f2d7f1e7c8b1f5c1', '60e4c4d9f2d7f1e7c8b1f5c2']
  })
  @IsNotEmpty()
  @IsMongoId({ each: true })
  @IsArray()
  permissions: mongoose.Schema.Types.ObjectId[];
}
