import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
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

  @Put(":id")
  @SuperAdmOnly()
  async update(
    @Param("id") id: string,
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    return await this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(":id")
  @SuperAdmOnly()
  async remove(@Param("id") id: string) {
    return await this.questionsService.remove(id);
  }
}
