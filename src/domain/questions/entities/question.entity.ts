import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { ModuleApp } from '../../modules/entities/module.entity';
import { AnswerOption } from './answer-option.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  text: string;

  @ManyToOne(() => ModuleApp, module => module.questions)
  module: ModuleApp;

  @OneToMany(() => AnswerOption, answerOption => answerOption.question, { cascade: true })
  options: AnswerOption[];
}