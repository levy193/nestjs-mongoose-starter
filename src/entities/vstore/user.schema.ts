import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { Exclude } from 'class-transformer';

import { ROLES } from '#common';
import { BaseSchema } from '../base';

export type UserDocument = HydratedDocument<User>;

@Schema({
  strictQuery: true,
})
export class User extends BaseSchema {
  @Exclude()
  __v: any;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, minlength: 2, maxlength: 50, trim: true })
  fullName: string;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Exclude()
  @Prop()
  passwordHash: string;

  @Exclude()
  @Prop()
  passwordSalt: string;

  @Prop({ type: [String], enum: Object.values(ROLES), default: [ROLES.USER] })
  roles: string[];

  @Prop()
  avatar: string;

  @Prop({ default: 0 })
  point: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(paginate);
