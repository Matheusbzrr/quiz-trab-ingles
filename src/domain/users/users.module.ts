import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { SecurityModule } from "src/infrastructure/security/security.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), SecurityModule],
  controllers: [AuthController],
  providers: [UsersService],
})
export class UsersModule {}
