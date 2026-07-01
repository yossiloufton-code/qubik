<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Card from 'primevue/card';
import Message from 'primevue/message';
import Skeleton from 'primevue/skeleton';
import Tag from 'primevue/tag';
import ProductReviews from '../components/products/ProductReviews.vue';
import BaseButton from '../components/shared/BaseButton.vue';
import BaseErrorState from '../components/shared/BaseErrorState.vue';
import { useProductDetails } from '../composables/useProductDetails';
import { useCartStore } from '../stores/cart.store';
import { formatCategory } from '../utils/formatCategory';
import { formatCurrency } from '../utils/formatCurrency';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const productId = computed(() => String(route.params.id));
const { product, isLoading, error, fetchProduct } = useProductDetails(productId.value);

const successMessage = ref<string | null>(null);

const addToCart = async () => {
  if (!product.value) {
    return;
  }

  successMessage.value = null;
  await cartStore.addItem(product.value.id);

  if (!cartStore.error) {
    successMessage.value = `${product.value.name} added to cart.`;
  }
};
</script>

<template>
  <section class="space-y-6">
    <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-sm font-semibold text-slate-500">
      <RouterLink to="/products" class="text-blue-700 hover:text-blue-900">
        Products
      </RouterLink>
      <span>/</span>
      <span class="truncate text-slate-700">{{ product?.name ?? 'Product details' }}</span>
    </nav>

    <BaseErrorState
      v-if="error"
      title="Product unavailable"
      :message="error"
      @retry="fetchProduct"
    />

    <div v-else-if="isLoading" class="grid gap-8 lg:grid-cols-[1fr_420px]">
      <Skeleton height="31rem" border-radius="2rem" />

      <div class="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <Skeleton width="8rem" height="1.25rem" />
        <Skeleton width="90%" height="3rem" />
        <Skeleton width="7rem" height="2rem" />
        <Skeleton width="100%" height="7rem" />
        <Skeleton width="100%" height="3rem" />
      </div>
    </div>

    <template v-else-if="product">
      <section class="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
        <div class="space-y-6">
          <div class="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-950/5">
            <img
              :src="product.thumbnailUrl"
              :alt="`${product.name} product image`"
              class="h-[28rem] w-full object-cover"
            />
          </div>

          <Card class="border border-slate-200 shadow-sm">
            <template #title>
              What you get
            </template>

            <template #content>
              <p class="leading-8 text-slate-600">
                {{ product.longDescription }}
              </p>

              <div class="mt-6 grid gap-3 sm:grid-cols-3">
                <div class="rounded-2xl bg-slate-50 p-4">
                  <p class="text-sm font-bold text-slate-500">Format</p>
                  <p class="mt-1 font-black text-slate-950">Digital</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-4">
                  <p class="text-sm font-bold text-slate-500">Delivery</p>
                  <p class="mt-1 font-black text-slate-950">Instant</p>
                </div>

                <div class="rounded-2xl bg-slate-50 p-4">
                  <p class="text-sm font-bold text-slate-500">Access</p>
                  <p class="mt-1 font-black text-slate-950">Lifetime</p>
                </div>
              </div>
            </template>
          </Card>

          <ProductReviews :reviews="product.reviews" />
        </div>

        <Card class="sticky top-24 border border-slate-200 shadow-2xl shadow-slate-950/10">
          <template #content>
            <Tag :value="formatCategory(product.category)" severity="info" />

            <h1 class="mt-4 text-3xl font-black tracking-tight text-slate-950">
              {{ product.name }}
            </h1>

            <p class="mt-4 text-slate-600">
              {{ product.shortDescription }}
            </p>

            <div class="mt-6 rounded-3xl bg-slate-50 p-5">
              <p class="text-sm font-bold text-slate-500">Price</p>
              <p class="mt-1 text-4xl font-black tracking-tight text-slate-950">
                {{ formatCurrency(product.price) }}
              </p>
            </div>

            <div class="mt-6 grid gap-3">
              <BaseButton class="w-full" :disabled="cartStore.isLoading" @click="addToCart">
                <span class="inline-flex items-center gap-2">
                  <i class="pi pi-shopping-cart" aria-hidden="true" />
                  {{ cartStore.isLoading ? 'Adding...' : 'Add to cart' }}
                </span>
              </BaseButton>

              <RouterLink
                to="/cart"
                class="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:bg-slate-100"
              >
                View cart
              </RouterLink>

              <button
                type="button"
                class="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-black text-blue-700 transition hover:bg-blue-50"
                @click="router.push('/products')"
              >
                Back to products
              </button>
            </div>

            <Message v-if="successMessage" class="mt-4" severity="success" :closable="false">
              {{ successMessage }}
            </Message>

            <Message v-if="cartStore.error" class="mt-4" severity="error" :closable="false">
              {{ cartStore.error }}
            </Message>
          </template>
        </Card>
      </section>
    </template>
  </section>
</template>
