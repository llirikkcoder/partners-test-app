const express = require('express');
const User = require('../models/User');
const upload = require('../middleware/upload');

const router = express.Router();

router.post('/register', upload.single('profilePhoto'), async (req, res) => {
  const { name, email, password, birthDate, gender } = req.body;
  const profilePhoto = req.file;

  try {
    const newUser = new User({
      name,
      email,
      password,
      birthDate,
      gender,
      profilePhoto: profilePhoto ? profilePhoto.path : null,
    });
    await newUser.save();
    res.status(201).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'No valid data' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      res.status(200).json({ message: 'Logged in successfully', user: user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/users/:id', upload.single('profilePhoto'), async (req, res) => {
  const { name, password } = req.body;
  const profilePhoto = req.file;

  try {
    const updatedData = { name, password }; // Hash the password before storing it

    if (profilePhoto) {
      updatedData.profilePhoto = profilePhoto.path;
    }

    const user = await User.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    }).lean();
    if (user) {
      res
        .status(200)
        .json({ message: 'User updated successfully', user: user });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
