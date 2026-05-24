import { IsString, IsEnum } from 'class-validator';
import { Cuisine } from '../../common/Cuisine';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ example: 'ahmed gamal', description: 'Full User Name' })
  @IsString()
  fullName: string;

  @ApiProperty({ enum: Cuisine, isArray: true, example: ['Burgers', 'Fried'] })
  @IsEnum(Cuisine, { each: true })
  favoriteCuisine: Cuisine[];
}
