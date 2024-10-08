import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MinLength, IsDate } from "class-validator";

export class CreateDetalleTrabajoDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    urlTrabajo:string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fechaHosting:Date;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fechaDominio:Date;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    idTrabajo:string;
}
