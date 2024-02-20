const User = require('./userModel'); // Assuming this is the User model

async function averageAgeOfUsers(req, res) {
  try {
    const averageAge = await User.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: '$age' } // Assuming 'age' is the field containing the age of users
        }
      }
    ]);

    if (averageAge.length > 0) {
      res.json({ averageAge: averageAge[0].averageAge });
    } else {
      res.status(404).json({ message: 'No users found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
