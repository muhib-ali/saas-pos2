import { IsUUID } from "class-validator";

export class DeleteModuleDto {
  @IsUUID()
  id: string;
}
