import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cuisine } from '../../common/Cuisine';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: [String],
    enum: Object.values(Cuisine),
    required: true,
  })
  favoriteCuisine: Cuisine[];
}

export const UserSchema = SchemaFactory.createForClass(User);
