import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User, UserRole } from "./entities/user.entity";
import { CreateProfessorDto, CreateStudentDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
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
    const email = createProfessorDto.email;
    const existingUser = await this.usersRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException("User with this email already exists");
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(
        createProfessorDto.password,
        salt
      );
      const newUser = this.usersRepository.create({
        ...createProfessorDto,
        password: hashedPassword,
        role: UserRole.PROFESSOR,
      });

      await this.usersRepository.save(newUser);
      const { password, ...result } = newUser;
      return result as User;
    } catch (error) {
      throw new InternalServerErrorException("Error creating user");
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const payload = {
      sub: user.id,
      email: user.email,
      isTeacher: user.role === 'professor' ? true : false,
    };

    const token = await this.jwtService.signAsync(payload);
    return { access_token: token };
  }
}
