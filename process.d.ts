declare namespace NodeJS {
  export interface ProcessEnv {
    NEXT_PUBLIC_VERCEL_URL: string;
    NEXT_PUBLIC_TIME_ZONE: string;
    NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string;
    VERCEL_WEB_ANALYTICS_DISABLE_LOGS: boolean;

    NEXT_PUBLIC_PROJECT_ID: string;
    NEXT_PUBLIC_CLIENT_KEY: string;
    NEXT_PUBLIC_APP_ID: string;
    NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: string;
  }
}
