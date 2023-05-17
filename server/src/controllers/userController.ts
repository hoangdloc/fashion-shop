import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import { User } from '../models/user';

const users: User[] = JSON.parse(
  fs.readFileSync(path.join('./src/data', 'users.json')).toString()
);

const getAllUsers = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
};

export default { getAllUsers };
