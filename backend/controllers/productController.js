const pool = require('../database');

const Product = require('../models/Product');

const Joi = require('joi');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
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

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product.dataValues);
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

    const newProduct = await Product.create({ name, description, price });

    res.json(newProduct.dataValues);
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
      name: Joi.string().min(3).max(50),
      description: Joi.string().min(3).max(255),
      price: Joi.number().min(1),
    });

    const { error } = schema.validate({ id, name, description, price });

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updateObject = { ...req.body };

    const updateProduct = await product.update(updateObject);

    res.json(updateProduct.dataValues);
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

    const deleteProduct = await Product.destroy({ where: { id } });

    if (deleteProduct !== 1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
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
