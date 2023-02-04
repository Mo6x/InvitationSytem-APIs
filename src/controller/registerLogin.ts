import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret');
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

   } catch (err) {
    let errorMessage = "Invalid Details";
    if (err instanceof Error) {
        errorMessage = err.message;
      }
    //   console.log(errorMessage);
    res.status(500).send('errorMessage');
    }};

    // LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' })
    };

    const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  return res.status(400).json({ msg: 'Invalid Credentials' });
}

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', {
  expiresIn: 3600
});

res.json({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

} catch (err) {
    let errorMessage = "Invalid Details";
    if (err instanceof Error) {
        errorMessage = err.message;
      }
    //   console.log(errorMessage);
    res.status(500).send('errorMessage');
    }};
    
    