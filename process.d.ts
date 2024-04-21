declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_VERCEL_URL: string;
    NEXT_PUBLIC_TIME_ZONE: string;
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string;
    VERCEL_WEB_ANALYTICS_DISABLE_LOGS: boolean;
  }
}
