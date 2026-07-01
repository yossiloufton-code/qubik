import { Router } from 'express';
import { cartRoutes } from '../modules/cart/cart.routes';
import { productRoutes } from '../modules/products/products.routes';

export const apiRoutes = Router();

apiRoutes.use('/products', productRoutes);
apiRoutes.use('/cart', cartRoutes);
