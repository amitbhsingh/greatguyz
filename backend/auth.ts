import { NextFunction, Request, Response } from "express"
import { DoneCallback } from "passport"

export const authUser = (user: string, password: string, done: DoneCallback) => {
  console.log('authUser()', { user, password })
  
  const username = user;
  
  // 1 Try to fetch user from Mongo
  const foundUser = {
    id: 42069,
    name: 'Ceni',
    email: 'ceni@example.com',
    password: '420',
  }
  
  // 2 If not found, return `done(null, False)`

  // 3 IF found, verify hashed password (hash provided password and compare)

  // 4 IF invalid, return `done(null, False)`

  // 5 IF valid, return `done(null, foundUser)
  return done(null, foundUser)
}

export const checkAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}
