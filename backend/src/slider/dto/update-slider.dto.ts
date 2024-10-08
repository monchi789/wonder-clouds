import { IsOptional, IsString, MinLength, IsBoolean } from "class-validator";

export class UpdateSliderDto{
    @IsOptional()
    @IsBoolean()
    estadoSlider:boolean;

    @IsString()
    @IsOptional()
    @MinLength(5)
    imagen:string;

}
