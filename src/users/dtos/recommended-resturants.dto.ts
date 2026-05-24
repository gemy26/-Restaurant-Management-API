import { Cuisine } from '../../common/Cuisine';

export class RecommendedRestaurantDto {
  _id: string;

  name: {
    ar: string;
    en: string;
  };

  slug: string;

  cuisines: Cuisine[];
}