import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateProfessorDto, CreateStudentDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async registerStudent(createStudentDto: CreateStudentDto): Promise<User> {
    const email = createStudentDto.email;
    const existingUser = await this.usersRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(createStudentDto.password, salt);
      const newUser = this.usersRepository.create({
        ...createStudentDto,
        password: hashedPassword,
        role: UserRole.ALUNO,
      });

      await this.usersRepository.save(newUser);
      const { password, ...result } = newUser;
      return result as User;
    } catch (error) {
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async registerProfessor(
    createProfessorDto: CreateProfessorDto
  ): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createProfessorDto.password, salt);

    const newProfessor = this.usersRepository.create({
      ...createProfessorDto,
      password: hashedPassword,
      role: UserRole.PROFESSOR,
    });

    try {
      return await this.usersRepository.save(newProfessor);
    } catch (error) {
      if (error.code === "23505") {
        throw new ConflictException("Este email já está em uso.");
      }
      throw error;
    }
  }

  login(data: any) {}
}
