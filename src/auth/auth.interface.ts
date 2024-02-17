export interface AuthConfigInterface {
  saltRounds: number;
  hashField: string;
  saltField: string;
}
export interface JwtSign {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  username: string;
  roles: string[];
}

export interface Payload {
  userId: string;
  username: string;
  roles: string[];
}
