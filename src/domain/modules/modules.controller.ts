import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleAppDto } from './dto/create-module.dto';
import { UpdateModuleAppDto } from './dto/update-module.dto';
import { IS_TEACHER, SuperAdmOnly } from '../common/decorators/teacher.decorator';

@Controller('modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @SuperAdmOnly()
  create(@Body() createModuleDto: CreateModuleAppDto) {
    return this.modulesService.create(createModuleDto);
  }

  @Get()
  findAll() {
    return this.modulesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modulesService.findOne(+id);
  }

  @Patch(':id')
  @SuperAdmOnly()
  update(@Param('id') id: string, @Body() updateModuleDto: UpdateModuleAppDto) {
    return this.modulesService.update(+id, updateModuleDto);
  }

  @Delete(':id')
  @SuperAdmOnly()
  remove(@Param('id') id: string) {
    return this.modulesService.remove(+id);
  }
}
