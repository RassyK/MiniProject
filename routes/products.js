import express from 'express';
import Product from '../models/Product.js';
const router = express.Router();
// GET /products – fetch and display all products
router.get('/', async (req, res) => {
 try {
 const products = await Product.find({});
 res.render('products/index', { title: 'Product Listings', products, productImageURI: '/path/to/product/image.jpg' });
 } catch (err) {
 console.error(err);
 res.status(500).send('Server Error');
 }
});
export default router;
// GET /products/new - Display the new product form
router.get('/new', (req, res) => {
    res.render('products/new', { title: 'Create New Product' });
});

// POST /products - Create a new product in the database
router.post('/', async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        const product = new Product({ name, description, price, imageUrl });
        await product.save();
        // After saving, redirect to the products listing page
        res.redirect('/products');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error while creating product.');
    }
});

