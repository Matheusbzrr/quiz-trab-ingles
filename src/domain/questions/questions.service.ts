import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import {
  CreateQuestionDto,
  UpdateQuestionDto,
} from "./dto/create-question.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Questions } from "./entities/question.entity";
import { Repository } from "typeorm";
import { AnswerOption } from "./entities/answer-option.entity";
import { ModuleApp } from "../modules/entities/module.entity";

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>,
    @InjectRepository(ModuleApp)
    private readonly moduleRepository: Repository<ModuleApp>
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const { text, moduleId } = createQuestionDto;
    const confirmModule = await this.moduleRepository.findOneBy({
      id: moduleId,
    });
    if (!confirmModule) {
      throw new NotFoundException("Modulo não encontrado");
    }
    const existQuestion = await this.questionsRepository.findOneBy({ text });
    if (existQuestion) {
      throw new ConflictException("Pergunta com o mesmo titulo");
    }
    const saveQuestion = this.questionsRepository.create(createQuestionDto);
    await this.questionsRepository.save(saveQuestion);
    return;
  }

  async findAllByModule(moduleId: number, page = 1, limit = 3) {
    const [questions, total] = await this.questionsRepository.findAndCount({
      where: { moduleId },
      relations: ["options"],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: questions,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }
  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ["options"],
    });

    if (!question) throw new NotFoundException("Pergunta não encontrada");
    if (updateQuestionDto.text !== undefined) {
      question.text = updateQuestionDto.text;
    }

    if (updateQuestionDto.options) {
      for (const opt of updateQuestionDto.options) {
        if (opt.id) {
          const existing = question.options.find((o) => o.id === opt.id);
          if (existing) {
            existing.text = opt.text ?? existing.text;
            existing.isCorrect = opt.isCorrect ?? existing.isCorrect;
          }
        } else {
          const newOption = this.questionsRepository.manager.create(
            AnswerOption,
            {
              text: opt.text,
              isCorrect: opt.isCorrect,
              question,
            }
          );
          question.options.push(newOption);
        }
      }
    }

    return this.questionsRepository.save(question);
  }
  async remove(id: string) {
    const question = await this.questionsRepository.findOne({
      where: { id },
      relations: ["options"],
    });

    if (!question) {
      throw new NotFoundException("Pergunta não encontrada");
    }
    await this.questionsRepository.remove(question);

    return { message: `Pergunta ${id} removida com sucesso` };
  }
}
