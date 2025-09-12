import { IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateModuleAppDto } from "./create-module.dto";
import { CreateQuestionDto } from "../../questions/dto/create-question.dto";

export class CreateModulesWithQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleWithQuestionsDto)
  modules: ModuleWithQuestionsDto[];
}

export class ModuleWithQuestionsDto extends CreateModuleAppDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}
