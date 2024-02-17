const mongoose = require('mongoose');

// Define the Mongoose schema for the User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true }
});

// Create the Mongoose model for the User schema
const User = mongoose.model('User', userSchema);

// Function to add a new user to the MongoDB database
async function addUserToDatabase(user) {
  try {
    // Create a new User object using the provided user data
    const newUser = new User(user);
    // Save the user to the database
    await newUser.save();
    console.log('User added successfully:', newUser);
  } catch (error) {
    console.error('Error adding user:', error);
  }
}

// Connect Mongoose to your MongoDB database
mongoose.connect('mongodb+srv://ontipulidevi123:RNefVUcxKhaN@yX2@tecky.ooq3dcb.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Usage example:
addUserToDatabase({ username: 'john_doe', email: 'john@example.com' });
