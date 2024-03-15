import { NextApiRequest, NextApiResponse } from 'next';
import connectDatabase from '../../../config/database';
import GoogleUser from '../../../models/user';
import { isValidObjectId } from 'mongoose';

// Connect to your database
connectDatabase();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { googleId },
    method,
  } = req;

  switch (method) {
    case 'GET':
       if (!isValidObjectId(googleId)) {
         return res.status(400).json({ message: 'Invalid user ID' });
       }
      try {
        const user = await GoogleUser.findOne({ googleId: googleId });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
      } catch (err: any) {
        // Handle errors appropriately
        return res.status(500).json({ message: 'Error retrieving user information', err: err.message });
      }
      case "POST":
      try {
        // Before creating a user, you should validate the request body to ensure required fields are provided
        const gUser = await GoogleUser.create(req.body);
        return res.status(201).json(gUser);
      } catch (err:any) {
        return res.status(500).json({ message: "Error creating user", error: err.message });
      }

    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
