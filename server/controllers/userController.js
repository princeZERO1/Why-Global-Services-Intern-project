import User from '../models/User.js';

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;

      if (req.body.password) {
        // The password hash logic should ideally be here if it's changing, 
        // since we didn't add a pre-save hook in the User model.
        import('bcryptjs').then(async (bcrypt) => {
          const salt = await bcrypt.default.genSalt(10);
          user.password = await bcrypt.default.hash(req.body.password, salt);
          const updatedUser = await user.save();
          res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address
          });
        });
        return;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        address: updatedUser.address
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const updateUserAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.address = req.body.address || user.address;
      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        address: updatedUser.address
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
