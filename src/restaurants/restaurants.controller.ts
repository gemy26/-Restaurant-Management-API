import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import {
  CreateRestaurantDto,
  ListRestaurantsDto,
  NearbyRestaurantsDto,
} from './dtos';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @Get()
  findAll(@Query() listRestaurantsDto: ListRestaurantsDto) {
    return this.restaurantsService.findAll(listRestaurantsDto);
  }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get('nearby')
  findNearby(@Query() nearbyRestaurantsDto: NearbyRestaurantsDto) {
    return this.findNearby(nearbyRestaurantsDto);
  }

  @Get('/:slug')
  findOne(@Param('slug') slug: string) {
    return this.restaurantsService.findOne(slug);
  }
}
