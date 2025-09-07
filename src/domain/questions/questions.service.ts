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

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionsRepository: Repository<Questions>
  ) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const { text, moduleId } = createQuestionDto;
    const confirmModule = await this.questionsRepository.findOneBy({
      moduleId,
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

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
