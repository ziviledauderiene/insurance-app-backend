declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      MONGO_COMPASS_USER: string;
      MONGO_COMPASS_PASS: string;
      PORT: string;
      MONGO_COMPASS_CLUSTER_DB: string;
      MONGO_COMPASS_CLUSTER_URL: string;
      JWT_SECRET: string;
      JWT_ISSUER: string;
    }
  }
}

export { ProcessEnv };
