import { PartialType } from '@nestjs/mapped-types';
import { CreateModuleAppDto } from './create-module.dto';

export class UpdateModuleAppDto extends PartialType(CreateModuleAppDto) {}
