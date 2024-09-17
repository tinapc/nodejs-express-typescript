import { Request, Response } from 'express';
import { getUsers, createUser, UserModel } from '../Models/User';
import { IUser } from '../types/user';

const SignUp = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await createUser({ name, email, password });
    res.status(201).json(user);
  } catch (e) {
    console.log('error here');
    res.status(400).json({
      error: e
    });
  }
};

const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $set: { name: req.body.name } },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (e) {
    res.status(400).json({
      error: e
    });
  }
};

export { SignUp, listUsers, updateUser, deleteUser };
