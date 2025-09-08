import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Questions } from '../../questions/entities/question.entity';
import { AnswerOption } from '../../questions/entities/answer-option.entity';

@Entity()
export class StudentAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.answers)
  student: User;

  @ManyToOne(() => Questions)
  question: Questions;

  @ManyToOne(() => AnswerOption)
  chosenOption: AnswerOption;
}