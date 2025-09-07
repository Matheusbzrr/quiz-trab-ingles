import { PartialType } from "@nestjs/mapped-types";

import {
  IsString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsOptional,
  IsBoolean,
} from "class-validator";
import { Type } from "class-transformer";

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

export class UpdateAnswerOptionDto {
  @IsOptional()
  id?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsBoolean()
  isCorrect?: boolean;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAnswerOptionDto)
  options?: UpdateAnswerOptionDto[];
}
