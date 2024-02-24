const mongoose = require('mongoose');

// Define the Category schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

// Define the Product schema with a reference to Category
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' } // Reference to Category
});

// Create the ProductWithCategory model
const ProductWithCategory = mongoose.model('ProductWithCategory', productSchema);

// Function to retrieve all products with populated category details
async function getProductsPopulatedWithCategory() {
  try {
    const products = await ProductWithCategory.find().populate('category');
    console.log('Products with category details:', products);
    return products;
  } catch (error) {
    console.error('Error getting products with category details:', error);
    return [];
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  // Example usage
  getProductsPopulatedWithCategory();
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
