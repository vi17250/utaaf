import { IsNotEmpty} from "class-validator";

export class ResponseDto {
    @IsNotEmpty()
    ascii: string;
}
