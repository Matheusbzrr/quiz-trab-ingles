import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Questions } from "./question.entity";

@Entity()
export class AnswerOption {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  text: string;

  @Column()
  isCorrect: boolean;

  @ManyToOne(() => Questions, (question) => question.options, {
    onDelete: "CASCADE",
  })
  question: Questions;
}
