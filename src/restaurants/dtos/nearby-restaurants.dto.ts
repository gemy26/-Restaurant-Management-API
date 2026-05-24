import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NearbyRestaurantsDto {
  @ApiProperty({ example: 12.1, description: 'Latitude' })
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @ApiProperty({ example: -1.7, description: 'Longitude' })
  @Type(() => Number)
  @IsNumber()
  lng: number;
}
