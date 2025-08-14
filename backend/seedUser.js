require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Remove existing admin (if any)
    await User.deleteMany({ email: 'admin@example.com' });

    // Create admin user without requiring email verification
    const admin = new User({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      isEmailVerified: true,
    });

    await admin.save();
    console.log('✅ Admin user created:', admin.email);
  } catch (err) {
    console.error('❌ Error creating admin user:', err);
    process.exit(1);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

seedAdmin();
