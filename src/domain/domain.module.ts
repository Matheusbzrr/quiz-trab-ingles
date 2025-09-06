import { Module } from '@nestjs/common';
import { ModulesModule } from './modules/modules.module';
import { UsersModule } from './users/users.module';
import { QuestionsModule } from './questions/questions.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [ModulesModule, UsersModule, QuestionsModule, QuizModule]
})
export class DomainModule {}
