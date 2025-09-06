// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { StudentAnswer } from '../../quiz/entities/student-answer.entity';

export enum UserRole {
  PROFESSOR = 'professor',
  ALUNO = 'aluno',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; 

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @OneToMany(() => StudentAnswer, studentAnswer => studentAnswer.student)
  answers: StudentAnswer[];
}