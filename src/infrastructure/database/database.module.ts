import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './typeorm.config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Apenas registra a conexão
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
