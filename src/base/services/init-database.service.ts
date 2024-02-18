import { AuthService } from '#/auth';
import { UsersService } from '#/users';
import { ROLES } from '#common';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class InitDatabaseService implements OnModuleInit {
  private logger = new Logger(InitDatabaseService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  onModuleInit() {
    this.createSuperAdmin();
  }

  async createSuperAdmin() {
    try {
      const existSuperAdmin = await this.usersService.findOne({ roles: ROLES.SUPER_ADMIN }, [
        '_id',
      ]);
      if (!existSuperAdmin) {
        await this.usersService.create({
          username: 'superadmin',
          fullName: 'Super Admin',
          email: 'superadmin@gmail.com',
          roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER],
        });
        await this.authService.setUserPassword('superadmin', '123456');
      }

      this.logger.log('Super admin created');
    } catch (error) {
      this.logger.error('Create super admin failed', error);
    }
  }
}
