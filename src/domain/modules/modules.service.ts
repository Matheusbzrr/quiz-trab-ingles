import { Injectable } from '@nestjs/common';
import { CreateModuleAppDto } from './dto/create-module.dto';
import { UpdateModuleAppDto } from './dto/update-module.dto';

@Injectable()
export class ModulesService {
  create(createModuleDto: CreateModuleAppDto) {
    return 'This action adds a new module';
  }

  findAll() {
    return `This action returns all modules`;
  }

  findOne(id: number) {
    return `This action returns a #${id} module`;
  }

  update(id: number, updateModuleDto: UpdateModuleAppDto) {
    return `This action updates a #${id} module`;
  }

  remove(id: number) {
    return `This action removes a #${id} module`;
  }
}
