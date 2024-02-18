export const config = {
  db: {
    mongo: {
      mainURL: process.env.MONGO_MAIN_URL,
    },
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
};
