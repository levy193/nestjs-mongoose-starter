import { AuthConfigInterface } from './auth.interface';

export const AuthConfig: AuthConfigInterface = {
  saltRounds: 10,
  hashField: 'passwordHash',
  saltField: 'passwordSalt',
};
