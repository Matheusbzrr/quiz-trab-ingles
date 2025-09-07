import { PartialType } from '@nestjs/mapped-types';

import { IsString, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnswerOptionDto {
  @IsString()
  text: string;

  @IsString()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsString()
  text: string;

  @IsNumber()
  moduleId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerOptionDto)
  options: CreateAnswerOptionDto[];
}

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {}