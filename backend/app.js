const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const connectDB = require('./config/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('public/uploads'));

connectDB();

app.use('', userRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
