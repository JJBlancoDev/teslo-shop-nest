import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({
    each: true, // Cada elemento del vector debe ser un string
  })
  @IsArray()
  sizes: string[];

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsArray()
  tags?: string[];

  @IsOptional()
  @IsString({
    each: true,
  })
  @IsArray()
  images?: string[];

  @IsIn(['men', 'women', 'kid', 'unisex'])
  gender: string;
}
