import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MinLength, IsBoolean } from "class-validator";

export class CreatePopUpDto{
    @IsNotEmpty()
    @IsBoolean()
    estadoPopUp:boolean;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    imagenPopUp:string;

}
