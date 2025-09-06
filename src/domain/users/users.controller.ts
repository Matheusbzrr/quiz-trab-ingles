import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { UsersService } from "./users.service";
import {
  CreateStudentDto,
  CreateProfessorDto,
  LoginDto
} from "../users/dto/create-user.dto";
import { Public } from "src/domain/common/decorators/public-route.decorator";

import { Request } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";

@Controller("auth")
export class AuthController {
  constructor(private authService: UsersService) {}

  @Public()
  @Post("login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Public()
  @Post("register/student")
  async registerStudent(@Body() createStudentDto: CreateStudentDto) {
    const user = await this.authService.registerStudent(createStudentDto);
    return;
  }

  @Public()
  @Post("register/admin/professor/create")
  async registerProfessor(@Body() createProfessorDto: CreateProfessorDto) {
    await this.authService.registerProfessor(createProfessorDto);
    return;
  }
}
