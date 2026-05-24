import { Cuisine } from '../../common/Cuisine';
import {
  IsString,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class NameDto {
  @ApiProperty({ example: 'Kentucky', description: 'English name' })
  @IsString()
  en: string;

  @ApiProperty({ example: 'دجاج كنتاكى', description: 'Arabic name' })
  @IsString()
  ar: string;
}

class LocationDto {
  @ApiProperty({ example: 15.4, description: 'Longitude' })
  @IsNumber()
  lng: number;

  @ApiProperty({ example: -12.5, description: 'Latitude' })
  @IsNumber()
  lat: number;
}

export class CreateRestaurantDto {
  @ApiProperty({ type: NameDto })
  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @ApiProperty({ example: 'KFC', description: 'Unique slug' })
  @IsString()
  slug: string;

  @ApiProperty({ enum: Cuisine, isArray: true, example: ['Burgers', 'Fried'] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsEnum(Cuisine, { each: true })
  cuisines: Cuisine[];

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
