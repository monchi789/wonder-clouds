import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MinLength, IsBoolean, IsDate } from "class-validator";

export class CreateTrabajoDto{
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    nombreTrabajo:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    portadaTrabajo:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    descripcionTrabajo:string;

    @IsNotEmpty()
    @IsBoolean()
    visibilidadTrabajo:boolean;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    fechaTrabajo:Date;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    idCliente:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    tipoTrabajo:string;
}
