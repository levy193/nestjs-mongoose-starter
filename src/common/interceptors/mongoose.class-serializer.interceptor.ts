import { ClassSerializerInterceptor, PlainLiteralObject, Type } from '@nestjs/common';
import { ClassTransformOptions, plainToClass } from 'class-transformer';
import { Document } from 'mongoose';

export function MongooseClassSerializerInterceptor(
  classToIntercept: Type,
  isPaginateResponse = false,
): typeof ClassSerializerInterceptor {
  return class Interceptor extends ClassSerializerInterceptor {
    private changePlainObjectToClass(document: PlainLiteralObject) {
      if (!(document instanceof Document)) {
        return document;
      }

      return plainToClass(classToIntercept, document.toJSON());
    }

    private prepareResponse(response: PlainLiteralObject | PlainLiteralObject[]) {
      if (isPaginateResponse) {
        return {
          ...response,
          items: response['items'].map(this.changePlainObjectToClass),
        };
      }

      if (Array.isArray(response)) {
        return response.map(this.changePlainObjectToClass);
      }

      return this.changePlainObjectToClass(response);
    }

    serialize(response: PlainLiteralObject | PlainLiteralObject[], options: ClassTransformOptions) {
      return super.serialize(this.prepareResponse(response), options);
    }
  };
}
