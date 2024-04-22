export const config = {
  appName: 'vstore',
  server: {
    port: process.env.PORT || 3000,
  },
  db: {
    mongo: {
      mainURL: process.env.DB_MONGO_MAIN_URL,
    },
    redis: {
      cacheURL: process.env.DB_REDIS_CACHE_URL,
    },
  },
  auth: {
    jwt: {
      secret: process.env.AUTH_JWT_SECRET,
      expiresIn: '1d',
      refreshExpiresIn: '7d',
    },
  },
  cacheManager: {
    ttl: 24 * 60 * 60 * 1000,
    prefix: 'cache-manager',
  },
  i18n: {
    defaultLang: 'vi',
    languages: ['vi', 'en'],
  },
};
