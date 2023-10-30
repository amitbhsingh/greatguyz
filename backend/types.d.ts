declare module 'express-session' {
  export interface Session {
    passport: {
      user: {
        id: string;
        displayName?: string;
        provider?: string;
        [key: string]: any; // for additional properties not explicitly typed
      };
    };
  }
}
