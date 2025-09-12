import { Module } from "@nestjs/common";
import { ModulesService } from "./modules.service";
import { ModulesController } from "./modules.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModuleApp } from "./entities/module.entity";
import { QuestionsService } from "../questions/questions.service";
import { Questions } from "../questions/entities/question.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ModuleApp, Questions])],
  controllers: [ModulesController],
  providers: [ModuleApp, ModulesService, QuestionsService],
})
export class ModulesModule {}
