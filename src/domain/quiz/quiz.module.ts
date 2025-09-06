import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentAnswer } from './entities/student-answer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([StudentAnswer])],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
