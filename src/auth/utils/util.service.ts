import { Injectable } from '@nestjs/common';
import { ConfigService } from '#common';

@Injectable()
export class AuthUtilService {
  constructor(private readonly configService: ConfigService) {}

  getCacheSessionKey(userId: string): string {
    return `${this.configService.get('appName')}:cache-manager:users:${userId}:session`;
  }
}
