import { IsNotEmpty, IsNumber, IsUrl, Max, Min } from "class-validator";
import { Transform } from "class-transformer";

export class Incoming_values {
  @Transform(({ value }) => {
    if (!value) return 2
    const num = Number(value);
    if (isNaN(num)) {
      throw new Error(`${value} is not a number`);
    }
    return num;
  })
  @IsNumber()
  @Min(2)
  @Max(10)
  scale: number;


  @IsNotEmpty()
  @IsUrl()
  url: string;
}
