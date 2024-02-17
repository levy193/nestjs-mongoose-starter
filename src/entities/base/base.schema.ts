import { Prop } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';

export class BaseSchema {
  @Transform(({ value }) => value.toString())
  _id?: string;

  @Exclude()
  @Prop({
    default: false,
  })
  isDeleted: boolean;

  @Exclude()
  @Prop({ default: null })
  deletedAt: Date;
}
