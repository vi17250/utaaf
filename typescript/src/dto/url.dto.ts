import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class UrlDto {
  @Transform(({ value }) => {
    if (!value) return 2
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error("Scale must be a number");
    }
    return num;
  })
  @IsNumber()
  @Min(2)
  @Max(10)
  scale: number;


  @IsString()
  @IsNotEmpty()
  incoming_value: string;
}
