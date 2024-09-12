import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends OmitType(CreatePermissionDto, ["name", "module", "method", "apiPath"] as const) {}
