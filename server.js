const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User');



const app = express();
const PORT = 5000;

// mongoose.connect('mongodb+srv://adnan191022:Adnan7527@quizapp.2jcuizt.mongodb.net/', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error(err));

// mongoose.connect('mongodb+srv://adnan191022:TestUser123!@quizapp.2jcuizt.mongodb.net/quizapp?retryWrites=true&w=majority')
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('MongoDB error:', err));

// testConnection.js






// mongoose.connect('mongodb+srv://Adnan7527:Adnan191022@quizapp.2jcuizt.mongodb.net/quizapp?retryWrites=true&w=majority')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch((err) => console.error('❌ MongoDB connection error:', err));

mongoose.connect('mongodb+srv://Adnan7527:Adnan191022@quizapp.2jcuizt.mongodb.net/quizapp?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));



app.use(cors());
app.use(bodyParser.json());

// Registration endpoint
app.post('/register', async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = new User({ fullName, email, password });
    await user.save(); // this saves to the DB
    res.status(201).send({ message: 'User registered' });
  } catch (error) {
    console.error(error); // <-- ADD THIS LINE
    res.status(400).send({ error: 'Email already exists or other error' });
  }
});


// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    res.send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
