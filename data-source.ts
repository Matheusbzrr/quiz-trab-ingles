import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { User } from "./src/domain/users/entities/user.entity";
import { Questions } from "./src/domain/questions/entities/question.entity";
import { AnswerOption } from "./src/domain/questions/entities/answer-option.entity";
import { StudentAnswer } from "./src/domain/quiz/entities/student-answer.entity";
import { ModuleApp } from "./src/domain/modules/entities/module.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Questions, AnswerOption, StudentAnswer, ModuleApp],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  logging: true,
});
