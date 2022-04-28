declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      SERVER_PORT: number;
      DB_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
    }
  }
}

export {};
