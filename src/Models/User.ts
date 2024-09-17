import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../types/user';

const saltGenerated = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, minlength: 3 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  isAdmin: { type: Boolean, default: false },
  token: { type: String }
});

const UserModel = mongoose.model('User', userSchema);

// create a new user
const createUser = async ({ name, email, password }: IUser) => {
  const hash = bcrypt.hashSync(password, saltGenerated);
  try {
    const user = await UserModel.create({ name, email, password: hash });

    return user;
  } catch (error) {
    return error;
  }
};

// get all users
const getUsers = async () => {
  return await UserModel.find();
};

export { UserModel, getUsers, createUser };
