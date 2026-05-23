import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Cuisine } from '../../common/Cuisine';

export type RestaurantDocument = HydratedDocument<Restaurant>;

@Schema()
export class Restaurant {
  @Prop({
    type: {
      en: { type: String, trim: true },
      ar: { type: String, trim: true },
    },
    required: true,
    _id: false,
  })
  name: {
    ar: string;
    en: string;
  };

  @Prop({
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  })
  slug: string;

  @Prop({
    type: [String],
    enum: Object.values(Cuisine),
    required: true,
    validate: {
      validator: (val: string[]) => val.length >= 1 && val.length <= 3,
      message: 'restaurant must have between 1 and 3 cuisines',
    },
  })
  cuisines: Cuisine[];

  @Prop(
    raw({
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
      _id: false,
    }),
  )
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ location: '2dsphere' });

