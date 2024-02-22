const mongoose = require('mongoose');

// Define the schema for the Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Function to create a new product
async function createProduct(product) {
  try {
    const newProduct = new Product(product);
    await newProduct.save();
    console.log('Product created successfully:', newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

// Function to retrieve all products
async function getAllProducts() {
  try {
    const products = await Product.find();
    console.log('All products:', products);
    return products;
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

// Function to update a product
async function updateProduct(productId, updatedProduct) {
  try {
    const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
    console.log('Product updated successfully:', product);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Function to delete a product
async function deleteProduct(productId) {
  try {
    await Product.findByIdAndDelete(productId);
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
  }
}

// Example usage
async function example() {
  await createProduct({ name: 'Product 1', price: 10, quantity: 5 });
  const products = await getAllProducts();
  if (products.length > 0) {
    const productId = products[0]._id;
    await updateProduct(productId, { price: 15 });
    await deleteProduct(productId);
  }
}

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
  example(); // Run example after connecting
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});
