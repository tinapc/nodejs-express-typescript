import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SignUp } from '../Controllers/User';
import { UserModel } from '../Models/User';

const router = express.Router();

router.post('/sign-up', SignUp);
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' }
  );

  await user.updateOne({ token });

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      accessToken: token
    }
  });
});

export default router;
