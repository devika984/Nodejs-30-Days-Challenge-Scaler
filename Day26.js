const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the product schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Function to calculate product statistics
const getProductStatistics = async () => {
  try {
    // Define the aggregation pipeline
    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          highestQuantity: { $max: '$quantity' }
        }
      }
    ];

    // Execute the aggregation pipeline
    const result = await Product.aggregate(pipeline);

    // Return the aggregated product statistics
    return result[0]; // Assuming there's only one result since we're grouping by null
  } catch (error) {
    console.error('Error calculating product statistics:', error);
    return null;
  }
};

// Example usage
getProductStatistics().then((statistics) => {
  if (statistics) {
    console.log('Product statistics:', statistics);
  } else {
    console.log('Failed to retrieve product statistics');
  }
});
