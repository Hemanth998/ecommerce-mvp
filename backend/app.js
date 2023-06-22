const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/products', require('./routes/productRoutes'));
