/*
 * Seed file for inserting Solar System planets into MongoDB with image support.
 * Images are served statically from /images (folder: backend/images).
 */

require('dotenv').config();
const mongoose  = require('mongoose');
const fs        = require('fs');
const path      = require('path');
const slugify   = require('slugify');
const Planet    = require('./models/Planet');

// Directory containing planet images
const imagesDir = path.join(__dirname, 'images');

// Array of planet data
const planets = [
  {
    name: 'Mercury',
    description:
      'Mercury is the smallest planet in our solar system and the one closest to the Sun. It has a rocky surface covered with craters.',
    radius: 2439.7,          // in kilometers
    mass: 0.330,             // in 10^24 kg
    distanceFromSun: 57.9,   // in million km
    orbitalPeriod: 88,       // in Earth days
    rotationPeriod: 1407.6,  // in Earth hours
    averageTemperature: 167, // in °C
    numOfMoons: 0,
    // new fields initialized as empty arrays
    exploration: [],        // missions data
    resources: [],          // docs, videos, links
    news: [],               // related news articles
    gallery: [],            // image URLs
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Venus',
    description:
      'Venus is the second planet from the Sun and is similar in size to Earth. It has a thick, toxic atmosphere and surface temperatures hot enough to melt lead.',
    radius: 6051.8,
    mass: 4.87,
    distanceFromSun: 108.2,
    orbitalPeriod: 224.7,
    rotationPeriod: 5832.5,
    averageTemperature: 464,
    numOfMoons: 0,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Earth',
    description:
      'Earth is the third planet from the Sun and the only known world to harbor life. Its surface is 71% water, and it has a breathable atmosphere.',
    radius: 6371,
    mass: 5.97,
    distanceFromSun: 149.6,
    orbitalPeriod: 365.2,
    rotationPeriod: 23.9,
    averageTemperature: 15,
    numOfMoons: 1,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Mars',
    description:
      'Mars is the fourth planet from the Sun, often called the "Red Planet" because of its reddish appearance. It has the largest volcano and canyon in the solar system.',
    radius: 3389.5,
    mass: 0.642,
    distanceFromSun: 227.9,
    orbitalPeriod: 687,
    rotationPeriod: 24.6,
    averageTemperature: -65,
    numOfMoons: 2,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Jupiter',
    description:
      'Jupiter is the largest planet in our solar system and is known for its Great Red Spot—a giant storm. It is a gas giant composed mostly of hydrogen and helium.',
    radius: 69911,
    mass: 1898,
    distanceFromSun: 778.5,
    orbitalPeriod: 4331,
    rotationPeriod: 9.9,
    averageTemperature: -110,
    numOfMoons: 79,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Saturn',
    description:
      'Saturn is famous for its striking ring system. It is a gas giant composed primarily of hydrogen and helium, and it has dozens of moons.',
    radius: 58232,
    mass: 568,
    distanceFromSun: 1433.5,
    orbitalPeriod: 10747,
    rotationPeriod: 10.7,
    averageTemperature: -140,
    numOfMoons: 82,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Uranus',
    description:
      'Uranus is an ice giant with a blue-green color due to methane in its atmosphere. It rotates on its side and has faint rings.',
    radius: 25362,
    mass: 86.8,
    distanceFromSun: 2872.5,
    orbitalPeriod: 30589,
    rotationPeriod: 17.2,
    averageTemperature: -195,
    numOfMoons: 27,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Neptune',
    description:
      'Neptune is the farthest known planet from the Sun and an ice giant. It is famous for strong winds and storms, including the Great Dark Spot.',
    radius: 24622,
    mass: 102,
    distanceFromSun: 4495.1,
    orbitalPeriod: 59800,
    rotationPeriod: 16.1,
    averageTemperature: -200,
    numOfMoons: 14,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
  {
    name: 'Pluto',
    description:
      'Pluto is a dwarf planet in the Kuiper Belt. Though once classified as the ninth planet, it was reclassified in 2006. It has a heart-shaped glacier and five known moons.',
    radius: 1188.3,
    mass: 0.01303,
    distanceFromSun: 5906.4,
    orbitalPeriod: 90560,
    rotationPeriod: 153.3,
    averageTemperature: -225,
    numOfMoons: 5,
    exploration: [],
    resources: [],
    news: [],
    gallery: [],
    imageUrl: '',
    textureUrl: '',
  },
];

// Seed function
const importData = async () => {
  try {
    // Remove existing
    await Planet.deleteMany();
    console.log('🗑 Existing planets removed');

    // Assign image paths
    planets.forEach(p => {
      const slug = slugify(p.name, { lower: true, strict: true });

      // Main image
      ['.png', '.jpg', '.jpeg'].some(ext => {
        const file = `${slug}${ext}`;
        if (fs.existsSync(path.join(imagesDir, file))) {
          p.imageUrl = `/images/${file}`;
          return true;
        }
        return false;
      });

      // Texture image (optional), named "slug-texture.ext"
      ['-texture.png', '-texture.jpg', '-texture.jpeg'].some(ext => {
        const file = `${slug}${ext}`;
        if (fs.existsSync(path.join(imagesDir, file))) {
          p.textureUrl = `/images/${file}`;
          return true;
        }
        return false;
      });
    });

    // Insert seeded data
    await Planet.insertMany(planets);
    console.log('✅ Planet data imported successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error importing data:', err);
    process.exit(1);
  }
};

// Connect to DB and run seed
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected for seeding');
    importData();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
