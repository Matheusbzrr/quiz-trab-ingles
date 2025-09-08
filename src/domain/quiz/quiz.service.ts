import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentAnswer } from "./entities/student-answer.entity";
import { CreateStudentAnswerDto } from "./dto/create-student-answer.dto.ts";
import { Questions } from "../questions/entities/question.entity";
import { AnswerOption } from "../questions/entities/answer-option.entity";

@Injectable()
export class StudentAnswersService {
  constructor(
    @InjectRepository(StudentAnswer)
    private readonly studentAnswerRepo: Repository<StudentAnswer>,

    @InjectRepository(Questions)
    private readonly questionRepo: Repository<Questions>,

    @InjectRepository(AnswerOption)
    private readonly optionRepo: Repository<AnswerOption>
  ) {}

  async createMany(
    dtos: CreateStudentAnswerDto[],
    moduleId: number,
    userPayload: { id: number; email: string; isTeacher: boolean }
  ) {
    const existingAnswers = await this.studentAnswerRepo.find({
      where: {
        student: { id: userPayload.id } as any,
        question: { moduleId } as any,
      },
      relations: ["question"],
    });

    if (existingAnswers.length > 0) {
      throw new BadRequestException("Você já respondeu esse módulo");
    }

    const savedAnswers = await Promise.all(
      dtos.map(async (dto) => {
        const question = await this.questionRepo.findOne({
          where: { id: dto.questionId },
          relations: ["options"],
        });
        if (!question)
          throw new NotFoundException(
            `Questão ${dto.questionId} não encontrada`
          );

        const chosenOption = await this.optionRepo.findOneBy({
          id: dto.optionId,
        });
        if (!chosenOption)
          throw new NotFoundException(`Opção ${dto.optionId} não encontrada`);

        const answer = this.studentAnswerRepo.create({
          student: { id: userPayload.id } as any,
          question,
          chosenOption,
        });

        return this.studentAnswerRepo.save(answer);
      })
    );

    return savedAnswers;
  }

  async findByStudent(studentId: number) {
    return this.studentAnswerRepo.find({
      where: { student: { id: studentId } },
      relations: ["question", "chosenOption"],
    });
  }
}
