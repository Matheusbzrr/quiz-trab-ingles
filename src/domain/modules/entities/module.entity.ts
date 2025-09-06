import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class ModuleApp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Question, question => question.module, {cascade: true})
  questions: Question[];
}