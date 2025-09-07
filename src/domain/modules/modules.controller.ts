import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ModulesService } from "./modules.service";
import { CreateModuleAppDto } from "./dto/create-module.dto";
import { UpdateModuleAppDto } from "./dto/update-module.dto";
import { SuperAdmOnly } from "../common/decorators/teacher.decorator";

@Controller("modules")
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @SuperAdmOnly()
  async create(@Body() createModuleDto: CreateModuleAppDto) {
    return await this.modulesService.create(createModuleDto);
  }

  @Get()
  async findAll() {
    return await this.modulesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.modulesService.findOne(+id);
  }

  @Patch(":id")
  @SuperAdmOnly()
  async update(
    @Param("id") id: string,
    @Body() updateModuleDto: UpdateModuleAppDto
  ) {
    return await this.modulesService.update(+id, updateModuleDto);
  }

  @Delete(":id")
  @SuperAdmOnly()
  async remove(@Param("id") id: string) {
    return await this.modulesService.remove(+id);
  }
}
