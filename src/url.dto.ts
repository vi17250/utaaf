import { IsUrl } from "class-validator";

export class UrlDto {
    @IsUrl()
    incoming_value: string;
}
