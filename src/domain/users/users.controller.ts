import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateStudentDto, CreateProfessorDto } from '../users/dto/create-user.dto';
import { Public } from 'src/domain/common/decorators/public-route.decorator';

import { Request } from '@nestjs/common';


@Controller('auth')
export class AuthController {
  constructor(private authService: UsersService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('register/student')
  async registerStudent(@Body() createStudentDto: CreateStudentDto) {
    const user = await this.authService.registerStudent(createStudentDto);
    return;
  }

  @Public()
  @Post('register/admin/professor/create')
  async registerProfessor(@Body() createProfessorDto: CreateProfessorDto) {
    const user = await this.authService.registerProfessor(createProfessorDto);
    return user;
  }
}