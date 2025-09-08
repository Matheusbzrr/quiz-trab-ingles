import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1757346139052 implements MigrationInterface {
    name = 'InitDatabase1757346139052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "module_app" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_1c242cdd3da144e7945c9f2019f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "answer_option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "isCorrect" boolean NOT NULL, "questionId" uuid, CONSTRAINT "PK_69dad60c2f58e523232f06f5d8d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "moduleId" integer NOT NULL, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_answer" ("id" SERIAL NOT NULL, "studentId" integer, "questionId" uuid, "chosenOptionId" uuid, CONSTRAINT "PK_376adcf5739803c71c22eece43b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('professor', 'aluno')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "answer_option" ADD CONSTRAINT "FK_cda1c6af66a3aa97ba20315298d" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_e210b876c917c60051043133b1e" FOREIGN KEY ("moduleId") REFERENCES "module_app"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_4827af87118435ca77775e8c22f" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_d1b9efd6286e9c05ed43cf28ae4" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_answer" ADD CONSTRAINT "FK_ed5a832d9ee2f4061c51d126e72" FOREIGN KEY ("chosenOptionId") REFERENCES "answer_option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_ed5a832d9ee2f4061c51d126e72"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_d1b9efd6286e9c05ed43cf28ae4"`);
        await queryRunner.query(`ALTER TABLE "student_answer" DROP CONSTRAINT "FK_4827af87118435ca77775e8c22f"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_e210b876c917c60051043133b1e"`);
        await queryRunner.query(`ALTER TABLE "answer_option" DROP CONSTRAINT "FK_cda1c6af66a3aa97ba20315298d"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "student_answer"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "answer_option"`);
        await queryRunner.query(`DROP TABLE "module_app"`);
    }

}
