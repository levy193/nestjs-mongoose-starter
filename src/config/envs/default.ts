export const config = {
  server: {
    port: process.env.PORT || 3000,
  },
  auth: {
    jwt: {
      expiresIn: '1d',
      refreshExpiresIn: '7d',
    },
  },
};
