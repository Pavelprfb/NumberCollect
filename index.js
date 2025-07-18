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
      comment: "মাশাআল্লাহ! কিন্তু ভাই, নৌকার উপর প্রান্তে যে ভাবি নাই এটা বুঝবো কেমন? দেখা যাচ্ছে আপনি পরিপূর্ণ করে অর্ধেক প্রকাশ করে অপরিপূর্ণ বলছেন😁",
      time: "Just Now",
      reactions: "👍 3"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkMpE45HeaPQkNCWRayOZjEc1WuTaHeBJwg&s",
      name: "Md Milon Khan",
      comment: "Great thoughts!",
      time: "40 min",
      reactions: "👍 18"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcNsO2huwRv5NOdwLtELsch7jSyIh1peY7REBLLC_tN8X5GD3dyyz4RABB&s=10",
      name: "Shojib Ahmed",
      comment: "Thanks for sharing.",
      time: "2 hrs",
      reactions: "♥️😘 22"
    },
    {
      picture: "https://mir-s3-cdn-cf.behance.net/user/276/74ba9b1654506277.677e04dfd65cf.png",
      name: "Ashik Islam",
      comment: "Interesting!",
      time: "3 hrs",
      reactions: "♥️ 34"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1bF4-6dgISAbMinquVbT2wM3dHihRXJlpapZox5z83FAbszkoC3L-w7Vd&s=10",
      name: "Mis Anika Akter",
      comment: "Loved it!",
      time: "4 hrs",
      reactions: "😘♥️ 43"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMTTKWHbTyyzamL-cIfbdezh5UdohgAiA-g&s",
      name: "সালমা আক্তার",
      comment: "Loved it!",
      time: "5 hrs",
      reactions: "👍♥️ 50"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvSqBb2ZzY3n5K7RznUC3CEedzP5EgLNSduQ&s",
      name: "Fatema Akter Rifa",
      comment: "Loved it!",
      time: "7 hrs",
      reactions: "👍♥️ 120"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTokGHEChibYjtYdCWpF60F4P8x32WhZerB5A&s",
      name: "Shakibal Hassan",
      comment: "Loved it!",
      time: "8 hrs",
      reactions: "👍♥️😘 219"
    },
    {
      picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQT08_1dF0iNLYfRnL2lbqnlXg5QKKofxDew&s",
      name: "Mamun Islan",
      comment: "Loved it!",
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