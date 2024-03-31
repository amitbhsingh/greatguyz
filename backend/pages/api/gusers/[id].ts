import { NextApiRequest, NextApiResponse } from 'next';
import connectDatabase from '../../../config/database';
import GoogleUser from '../../../models/user';


// Connect to your database


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDatabase();
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case 'GET':
      if (typeof id !== 'string') {
        return res.status(400).json({ message: 'id must be a string' });
      }

      try {
        const user = await GoogleUser.findOne({ id: id });
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
      } catch (err: any) {
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
