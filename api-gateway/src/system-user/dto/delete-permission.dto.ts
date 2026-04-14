import { IsUUID } from "class-validator";

export class DeletePermissionDto {
  @IsUUID()
  id: string;
}
