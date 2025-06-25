const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://127.0.0.1:27017/flightBookingDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAdmin = async () => {
  const email = 'gowtham@gmail.com';
  const password = 'admin';

  const existing = await Admin.findOne({ email });
  if (!existing) {
    const hashed = await bcrypt.hash(password, 10);
    await Admin.create({ email, password: hashed });
    console.log('✅ Admin created with hashed password');
  } else {
    console.log('⚠️ Admin already exists');
  }

  mongoose.disconnect();
};

seedAdmin();
