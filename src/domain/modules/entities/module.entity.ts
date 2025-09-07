import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Questions } from "../../questions/entities/question.entity";

@Entity()
export class ModuleApp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Questions, (question) => question.module, { cascade: true })
  questions: Questions[];
}
