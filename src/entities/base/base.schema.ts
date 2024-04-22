import { Prop } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';

// Multiple languages schema
export class I18nSchema {
  @Prop({ default: {}, type: Object })
  vi: { [key: string]: string };

  @Prop({ default: {}, type: Object })
  en: { [key: string]: string };
}

export class BaseSchema {
  @Transform(({ value }) => value.toString())
  _id?: string;

  // Soft delete
  @Exclude()
  @Prop({
    default: false,
  })
  isDeleted: boolean;

  // Published
  @Prop({
    default: true,
  })
  isPublished: boolean;

  // Sort order
  @Prop({
    default: 0,
  })
  sortOrder: number;

  // Auditing
  @Exclude()
  @Prop({ default: null })
  createdBy: string;

  // Multiple languages
  @Prop({ default: {}, type: I18nSchema })
  i18n: I18nSchema;
}
