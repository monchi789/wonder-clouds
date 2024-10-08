import { Type } from "class-transformer";
import { IsOptional, IsString, MinLength, IsDate } from "class-validator";

export class UpdateDetalleTrabajoDto{
    @IsString()
    @IsOptional()
    @MinLength(5)
    urlTrabajo:string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fechaHosting:Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    fechaDominio:Date;

    @IsString()
    @IsOptional()
    @MinLength(5)
    idTrabajo:string;
}
