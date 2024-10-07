import { IsNotEmpty, IsString, MinLength, IsBoolean } from "class-validator";

export class UpdatePopUpDto{
    @IsNotEmpty()
    @IsBoolean()
    estadoPopUp:boolean;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    imagenPopUp:string;

}
