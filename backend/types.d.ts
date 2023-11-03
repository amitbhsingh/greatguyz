import { PassportSession } from 'passport';

declare module 'express-session' {
  interface SessionData {
    passport: PassportSession;
  }
}
