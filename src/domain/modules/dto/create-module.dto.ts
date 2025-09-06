import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQuestionDto } from '../../questions/dto/create-question.dto';

export class CreateModuleAppDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
