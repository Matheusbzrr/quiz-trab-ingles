import { IsNotEmpty, IsString } from 'class-validator';


export class CreateModuleAppDto {
  @IsNotEmpty()
  @IsString()
  title: string;

}
