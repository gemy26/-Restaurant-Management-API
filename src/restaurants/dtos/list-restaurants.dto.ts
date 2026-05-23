import { Cuisine } from '../../common/Cuisine';
import { IsEnum, IsOptional } from 'class-validator';

export class ListRestaurantsDto {
  @IsEnum(Cuisine)
  @IsOptional()
  cuisine?: Cuisine;
}
