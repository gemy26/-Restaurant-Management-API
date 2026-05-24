import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Restaurant, RestaurantDocument } from './schemas/resturant.schema';
import { isValidObjectId, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateRestaurantDto,
  ListRestaurantsDto,
  NearbyRestaurantsDto,
} from './dtos';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const resturant = await this.findOne(createRestaurantDto.slug);
    if (resturant) {
      throw new BadRequestException('Resturant already found');
    }
    const newRestaurant = new this.restaurantModel({
      name: createRestaurantDto.name,
      slug: createRestaurantDto.slug,
      cuisines: createRestaurantDto.cuisines,
      location: {
        type: 'Point',
        coordinates: [
          createRestaurantDto.location.lng,
          createRestaurantDto.location.lat,
        ],
      },
    });

    return newRestaurant.save();
  }

  async findAll(listRestaurantsDto: ListRestaurantsDto): Promise<Restaurant[]> {
    const filter = listRestaurantsDto.cuisine
      ? { cuisines: listRestaurantsDto.cuisine }
      : {};
    return this.restaurantModel.find(filter).exec();
  }

  async findNearby(lat: number, lng: number): Promise<Restaurant[]> {
    return this.restaurantModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [lng, lat],
            },
            $maxDistance: 1000,
          },
        },
      })
      .exec();
  }

  async findOne(slug: string): Promise<Restaurant | null> {
    const filter = isValidObjectId(slug) ? { _id: slug } : { slug: slug };
    return this.restaurantModel.findOne(filter).exec();
  }

  async findOneBySlug(slug: string): Promise<Restaurant> {
    const filter = isValidObjectId(slug) ? { _id: slug } : { slug: slug };
    const resturant = await this.restaurantModel.findOne(filter).exec();
    if (!resturant) {
      throw new NotFoundException('Resturant Not Found');
    }
    return resturant;
  }
}
