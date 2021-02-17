declare module '@env' {
  export const APP_NAME: string;
  export const API_URL: string;
  export const API_TOKEN: string;
  export const PORT: number;
  export const ENV: 'development' | 'production' | 'test';
}
