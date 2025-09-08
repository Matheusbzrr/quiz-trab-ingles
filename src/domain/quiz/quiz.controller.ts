import { Controller, Post, Body, Request, Get, Param } from "@nestjs/common";
import { StudentAnswersService } from "./quiz.service";
import { CreateStudentAnswerDto } from "./dto/create-student-answer.dto.ts";

@Controller("/student-answers")
export class StudentAnswersController {
  constructor(private readonly studentAnswersService: StudentAnswersService) {}

  @Post('/module/:moduleId')
  async createMany(
    @Param("moduleId") moduleId: number,
    @Body() dtos: CreateStudentAnswerDto[],
    @Request() req
  ) {
    return this.studentAnswersService.createMany(dtos, +moduleId, req.user);
  }

  @Get("me")
  async myAnswers(@Request() req) {
    return this.studentAnswersService.findByStudent(req.user.id);
  }
}
