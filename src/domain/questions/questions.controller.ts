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
import { plainToInstance } from "class-transformer";
import { QuestionResponseDto } from "./dto/questions-response.dto";

@Controller("questions")
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @SuperAdmOnly()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  // respostas
  @SuperAdmOnly()
  @Get("/module/:moduleId/gabarito")
  async findAllByModule(
    @Param("moduleId") moduleId: number,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 3
  ) {
    return this.questionsService.findAllByModule(moduleId, +page, +limit);
  }

  // perguntas
  @Get("/module/:moduleId")
  async findAllByModuleQuestions(
    @Param("moduleId") moduleId: number,
    @Query("page") page: number = 1,
    @Query("limit") limit: number = 3
  ) {
    const response = await this.questionsService.findAllByModule(
      moduleId,
      +page,
      +limit
    );

    return {
      ...response,
      data: plainToInstance(QuestionResponseDto, response.data, {
        excludeExtraneousValues: true,
      }),
    };
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
