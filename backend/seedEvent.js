// seederEvent.js
require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => importEvents())
.catch(err => {
  console.error('DB connection error:', err);
  process.exit(1);
});

const events = [
  {
    title: 'Sputnik 1 Launch',
    date: new Date('1957-10-04'),
    description: 'First artificial satellite launched by USSR.',
    imageUrl: ''
  },
  {
    title: 'Apollo 11 Moon Landing',
    date: new Date('1969-07-20'),
    description: 'NASA’s Apollo 11 landed first humans on the Moon.',
    imageUrl: ''
  },
  {
    title: 'Voyager 1 & 2 Launch',
    date: new Date('1977-09-05'),
    description: 'NASA launched Voyager probes to explore outer planets.',
    imageUrl: ''
  },
  // thêm các mốc khác…
];

async function importEvents() {
  try {
    await Event.deleteMany();
    console.log('Old events removed');
    await Event.insertMany(events);
    console.log('Events seeded');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}
