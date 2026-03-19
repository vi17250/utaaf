import { IsNotEmpty, IsUrl } from "class-validator";

export class UrlDto {
    @IsNotEmpty()
    @IsUrl()
    incoming_value!: string;
}
