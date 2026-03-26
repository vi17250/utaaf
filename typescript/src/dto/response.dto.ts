import { IsNotEmpty } from "class-validator";

class Size {
    @IsNotEmpty()
    width: number;
    @IsNotEmpty()
    height: number;
}

export class ResponseDto {
    @IsNotEmpty()
    original_size: Size;
    @IsNotEmpty()
    ascii_size: Size;
    @IsNotEmpty()
    resolution: number;
    @IsNotEmpty()
    pixels_processed: number;
    @IsNotEmpty()
    ascii: string;
}
