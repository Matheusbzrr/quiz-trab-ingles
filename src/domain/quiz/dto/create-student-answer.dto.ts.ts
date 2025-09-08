import { IsUUID } from "class-validator";

export class CreateStudentAnswerDto {
  @IsUUID()
  questionId: string;

  @IsUUID()
  optionId: string;
}
