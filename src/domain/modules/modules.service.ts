import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateModuleAppDto } from "./dto/create-module.dto";
import { UpdateModuleAppDto } from "./dto/update-module.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ModuleApp } from "./entities/module.entity";
import { CreateModulesWithQuestionsDto } from "./dto/create-modules-with-questions";
import { QuestionsService } from "../questions/questions.service";

@Injectable()
export class ModulesService {
  constructor(
    @InjectRepository(ModuleApp)
    private readonly moduleRepository: Repository<ModuleApp>,
    private readonly questionsService: QuestionsService
  ) {}

  async create(createModuleDto: CreateModuleAppDto) {
    const title = createModuleDto.title;
    const existmodule = await this.moduleRepository.findOneBy({ title });
    if (existmodule) {
      throw new ConflictException("Modulo com esse titulo ja existe");
    }

    try {
      const newModule = this.moduleRepository.create(createModuleDto);
      return await this.moduleRepository.save(newModule);
    } catch (error) {
      throw new InternalServerErrorException("Erro no servidor");
    }
  }

  async createModulesWithQuestions(dto: CreateModulesWithQuestionsDto) {
    const createdModules: ModuleApp[] = [];

    for (const moduleDto of dto.modules) {
      const existModule = await this.moduleRepository.findOneBy({
        title: moduleDto.title,
      });
      if (existModule) {
        throw new ConflictException(
          `Módulo com título "${moduleDto.title}" já existe`
        );
      }
      const newModule = this.moduleRepository.create({
        title: moduleDto.title,
      });
      await this.moduleRepository.save(newModule);

      for (const questionDto of moduleDto.questions) {
        await this.questionsService.create({
          ...questionDto,
          moduleId: newModule.id,
        });
      }

      createdModules.push(newModule);
    }

    return createdModules;
  }

  async findAll() {
    return await this.moduleRepository.find();
  }

  async findOne(id: number) {
    const module = await this.moduleRepository.findOne({
      where: { id } /*relations: ['questions']*/,
    });
    return module;
  }

  async update(
    id: number,
    updateModuleDto: UpdateModuleAppDto
  ): Promise<ModuleApp> {
    const entity = await this.moduleRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Módulo com ID ${id} não encontrado`);
    }

    const mergedEntity = this.moduleRepository.merge(entity, updateModuleDto);
    return this.moduleRepository.save(mergedEntity);
  }

  async remove(id: number) {
    const deleteModule = await this.moduleRepository.findOne({ where: { id } });
    if (!deleteModule) {
      throw new NotFoundException(`Módulo com ID ${id} não encontrado`);
    }
    return await this.moduleRepository.delete(deleteModule.id);
  }
}
