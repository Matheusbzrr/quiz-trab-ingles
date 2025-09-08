import { Expose, Type } from "class-transformer";
import { IsString, IsNumber, IsArray, ValidateNested } from "class-validator";

export class AnswerOptionResponseDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  text: string;
}

export class QuestionResponseDto {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  text: string;

  @Expose()
  @IsNumber()
  moduleId: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionResponseDto)
  options: AnswerOptionResponseDto[];
}
