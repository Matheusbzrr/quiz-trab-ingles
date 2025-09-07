import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import {
  CreateQuestionDto,
  UpdateQuestionDto,
} from "./dto/create-question.dto";
import { SuperAdmOnly } from "../common/decorators/teacher.decorator";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @SuperAdmOnly()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get("/module/:moduleId")
  async findAllByModule(
    @Param("moduleId") moduleId: number,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 3
  ) {
    return this.questionsService.findAllByModule(moduleId, +page, +limit);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(":id")
  @SuperAdmOnly()
  update(
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(":id")
  @SuperAdmOnly()
  remove(@Param("id") id: string) {
    return this.questionsService.remove(+id);
  }
}
