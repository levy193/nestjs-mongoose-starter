export const config = {
  db: {
    mongo: {
      vstoreURL: process.env.MONGO_VSTORE,
    },
  },
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET,
    },
  },
};
