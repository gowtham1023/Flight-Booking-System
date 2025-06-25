const Admin = require('../models/Admin');

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    res.status(200).json({ success: true, message: 'Admin authenticated' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
