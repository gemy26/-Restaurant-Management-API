import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { Follow, FollowDocument } from './schemas/follow.schema';
import { CreateUserDto, RecommendedRestaurantDto } from './dtos';
import {
  Restaurant,
  RestaurantDocument,
} from '../restaurants/schemas/resturant.schema';
import { FollowDto } from './dtos/follow.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Follow.name)
    private readonly followModel: Model<FollowDocument>,
  ) {}

  async create(createrUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      fullName: createrUserDto.fullName,
    });
    if (user) {
      throw new BadRequestException('User Already Found');
    }
    const newUser = new this.userModel({
      ...createrUserDto,
    });
    return newUser.save();
  }

  async recommend(userId: string): Promise<RecommendedRestaurantDto> {
    const userObjId = new Types.ObjectId(userId);

    const [result] = await this.userModel.aggregate([
      {
        $match: { _id: userObjId },
      },

      {
        $lookup: {
          from: 'users',

          let: {
            cuisines: '$favoriteCuisine',
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $ne: ['$_id', userObjId] },

                    {
                      $gt: [
                        {
                          $size: {
                            $setIntersection: [
                              '$favoriteCuisine',
                              '$$cuisines',
                            ],
                          },
                        },
                        0,
                      ],
                    },
                  ],
                },
              },
            },

            {
              $project: {
                _id: 1,
                fullName: 1,
                favoriteCuisine: 1,
              },
            },
          ],

          as: 'similarUsers',
        },
      },

      {
        $lookup: {
          from: 'follows',

          let: {
            userIds: '$similarUsers._id',
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$userId', '$$userIds'],
                },
              },
            },
          ],

          as: 'restaurantFollows',
        },
      },

      {
        $lookup: {
          from: 'restaurants',

          let: {
            restaurantIds: '$restaurantFollows.restaurantId',
          },

          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ['$_id', '$$restaurantIds'],
                },
              },
            },
          ],

          as: 'recommendedRestaurants',
        },
      },
      {
        $project: {
          _id: 0,

          similarUsers: 1,

          recommendedRestaurants: 1,
        },
      },
    ]);

    return result;
  }

  async follow(followDto: FollowDto): Promise<void> {
    await new this.followModel(followDto).save();
  }
}
