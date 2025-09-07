import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { ModuleApp } from "../../modules/entities/module.entity";
import { AnswerOption } from "./answer-option.entity";

@Entity()
export class Questions {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  text: string;

  @Column()
  moduleId: number;

  @ManyToOne(() => ModuleApp, (module) => module.questions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "moduleId" })
  module: ModuleApp;

  @OneToMany(() => AnswerOption, (answerOption) => answerOption.question, {
    cascade: true,
  })
  options: AnswerOption[];
}
