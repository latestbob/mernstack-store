
import { Router } from 'express';
import { getAllProducts } from '../controllers/productController.js';
import { getUniqueProduct } from '../controllers/productController.js';
import { addProduct } from '../controllers/productController.js';

const productRouter = Router();

productRouter.get('/products',getAllProducts);

productRouter.get('/product/:id', getUniqueProduct);

productRouter.post('/product/create', addProduct);


export default productRouter;