const pool = require('../database');

const Joi = require('joi');

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

    const schema = Joi.object({
      id: Joi.number().integer().min(1).required(),
    });

    const { error } = schema.validate({ id });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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

    const schema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(255).required(),
      price: Joi.number().min(1).required(),
    });

    const { error } = schema.validate({ name, description, price });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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

    const schema = Joi.object({
      id: Joi.number().integer().min(1).required(),
      name: Joi.string().min(3).max(50).required(),
      description: Joi.string().min(3).max(255).required(),
      price: Joi.number().min(1).required(),
    });

    const { error } = schema.validate({ id, name, description, price });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

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

    const schema = Joi.object({
      id: Joi.number().integer().min(1).required(),
    });

    const { error } = schema.validate({ id });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
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
