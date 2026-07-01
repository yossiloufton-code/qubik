import { createRouter, createWebHistory } from 'vue-router';
import ProductListPage from '../../pages/ProductListPage.vue';
import ProductDetailsPage from '../../pages/ProductDetailsPage.vue';
import ShoppingCartPage from '../../pages/ShoppingCartPage.vue';
import NotFoundPage from '../../pages/NotFoundPage.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/products',
    },
    {
      path: '/products',
      name: 'products',
      component: ProductListPage,
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: ProductDetailsPage,
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: ShoppingCartPage,
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundPage,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/not-found',
    },
  ],
});
