import { Public } from '#/common/decorators';
import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private httpHealIndicator: HttpHealthIndicator,
    private mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Public()
  @Get('health')
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.httpHealIndicator.pingCheck('dns', 'https://1.1.1.1'),
      () => this.mongooseHealthIndicator.pingCheck('mongodb'),
    ]);
  }
}
