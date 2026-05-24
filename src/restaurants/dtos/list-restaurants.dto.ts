import { Cuisine } from '../../common/Cuisine';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ListRestaurantsDto {
  @ApiPropertyOptional({ enum: Cuisine, description: 'Filter by cuisine' })
  @IsEnum(Cuisine)
  @IsOptional()
  cuisine?: Cuisine;
}
