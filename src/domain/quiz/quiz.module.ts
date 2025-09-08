import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentAnswer } from './entities/student-answer.entity';
import { StudentAnswersController } from './quiz.controller';
import { StudentAnswersService } from './quiz.service';
import { AnswerOption } from '../questions/entities/answer-option.entity';
import { Questions } from '../questions/entities/question.entity';


@Module({
  imports: [TypeOrmModule.forFeature([StudentAnswer, AnswerOption, Questions])],
  controllers: [StudentAnswersController],
  providers: [StudentAnswersService],
})
export class QuizModule {}
