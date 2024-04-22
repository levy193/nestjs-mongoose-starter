import { AuthService } from '#/auth/';
import { ROLES } from '#common';
import { UsersService } from '#modules/users';
import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class SeederService {
  private logger = new Logger(SeederService.name);
  fakerRounds = 10;

  constructor(
    @InjectConnection('main')
    private readonly mongoConnection: Connection,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async seed(clearDataBefore: boolean) {
    // Check if the environment is development
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Seeder is only allowed in development environment');
    }

    this.logger.log('Seeding started...');

    // Clear all collections
    if (clearDataBefore) {
      const collections = await this.mongoConnection.db.listCollections().toArray();
      for (const collection of collections) {
        await this.mongoConnection.collection(collection.name).drop();
      }
      this.logger.log('Database collections cleared');
    }

    await this.seedUsers();

    this.logger.log('Seeding completed...');

    // Close connection & shutdown
    await this.mongoConnection.close();
    process.exit(0);
  }

  async seedSuperAdmin(username, password) {
    const usersCollection = this.mongoConnection.collection('users');
    const existSuperAdmin = await usersCollection.findOne({ roles: ROLES.SUPER_ADMIN });
    if (!existSuperAdmin) {
      await usersCollection.insertOne({
        username: username,
        email: `${username}@test.gg`,
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER],
      });
      await this.authService.setUserPassword(username, password);
    }
    this.logger.log('Super admin created');
  }

  async seedUsers() {
    const users = [];
    for (let i = 0; i < this.fakerRounds; i++) {
      users.push({
        username: faker.internet.userName(),
        fullName: faker.person.firstName() + ' ' + faker.person.lastName(),
        avatar: faker.image.avatar(),
        email: faker.internet.email(),
        roles: [ROLES.USER],
      });
    }
    await this.userService.create(users);
    this.logger.log('Users seeded');
  }
}
