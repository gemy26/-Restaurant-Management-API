import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import {
  CreateRestaurantDto,
  ListRestaurantsDto,
  NearbyRestaurantsDto,
} from './dtos';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @ApiOperation({ summary: 'List all restaurants or filter by cuisine' })
  @ApiResponse({ status: 200, description: 'Return all restaurants.' })
  @Get()
  findAll(@Query() listRestaurantsDto: ListRestaurantsDto) {
    return this.restaurantsService.findAll(listRestaurantsDto);
  }

  @ApiOperation({ summary: 'Create new restaurant' })
  @ApiResponse({
    status: 201,
    description: 'The restaurant has been successfully created.',
  })
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @ApiOperation({ summary: 'Find nearby restaurants within 1KM' })
  @ApiResponse({ status: 200, description: 'Return Nearby Restaurants.' })
  @Get('nearby')
  findNearby(@Query() nearbyRestaurantsDto: NearbyRestaurantsDto) {
    return this.restaurantsService.findNearby(
      nearbyRestaurantsDto.lat,
      nearbyRestaurantsDto.lng,
    );
  }

  @ApiOperation({ summary: 'Get a restaurant by ID/slug' })
  @ApiResponse({ status: 200, description: 'Return the restaurant details.' })
  @Get('/:slug')
  findOne(@Param('slug') slug: string) {
    return this.restaurantsService.findOneBySlug(slug);
  }
}
