import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class RatedDto {
  @IsString()
  @IsNotEmpty()
  order_id: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsOptional()
  comment?: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  star: number;

  @IsString({ each: true })
  @IsOptional()
  images?: string[];
}
