const createProductNameIndex = () => {
  // Get access to the Product model
  const Product = mongoose.model('Product');

  // Create an index on the "name" field
  Product.createIndex({ name: 1 }, (err, result) => {
    if (err) {
      console.error('Error creating index:', err);
    } else {
      console.log('Index created successfully:', result);
    }
  });
};
