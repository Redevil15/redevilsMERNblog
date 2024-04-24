import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    if (error.code === 11000) {
      // This handles duplicate key errors
      const field = error.message.split('index: ')[1].split(' dup key')[0].split('_1')[0];
      return res.status(409).json({ message: `An account with that ${field} already exists.` });
    }
    // General error handling
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};