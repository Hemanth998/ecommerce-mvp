const pool = require('../database');

const getAllProducts = async (req, res) => {
  try {
    const products = await pool.query('SELECT * FROM products');
    res.json(products.rows);
  } catch (err) {
    console.error(err.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [
      id,
    ]);

    if (product.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await pool.query(
      'INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *',
      [name, description, price]
    );

    res.json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const updateProduct = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *',
      [name, description, price, id]
    );
    if (updateProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updateProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [id]
    );

    if (deleteProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deleteProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
