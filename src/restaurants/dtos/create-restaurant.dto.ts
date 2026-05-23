import { Cuisine } from '../../common/Cuisine';
import {
  IsString,
  IsEnum,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class NameDto {
  @IsString()
  en: string;

  @IsString()
  ar: string;
}

class LocationDto {
  @IsNumber()
  lng: number;

  @IsNumber()
  lat: number;
}

export class CreateRestaurantDto {
  @Type(() => NameDto)
  name: NameDto;

  @IsString()
  slug: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsEnum(Cuisine, { each: true })
  cuisines: Cuisine[];

  @Type(() => LocationDto)
  location: LocationDto;
}
