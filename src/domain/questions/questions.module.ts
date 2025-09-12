import { Module } from "@nestjs/common";
import { QuestionsService } from "./questions.service";
import { QuestionsController } from "./questions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Questions } from "./entities/question.entity";
import { ModuleApp } from "../modules/entities/module.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Questions, ModuleApp])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
