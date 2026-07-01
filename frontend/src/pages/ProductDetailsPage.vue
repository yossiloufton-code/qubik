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
    <button
      type="button"
      class="text-sm font-semibold text-blue-700 hover:text-blue-900"
      @click="router.push('/products')"
    >
      ← Back to products
    </button>

    <BaseErrorState
      v-if="error"
      title="Product unavailable"
      :message="error"
      @retry="fetchProduct"
    />

    <div v-else-if="isLoading" class="grid gap-8 lg:grid-cols-2">
      <Skeleton height="24rem" border-radius="1.5rem" />

      <div class="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Skeleton width="8rem" height="1.25rem" />
        <Skeleton width="75%" height="2.5rem" />
        <Skeleton width="6rem" height="1.5rem" />
        <Skeleton width="100%" height="6rem" />
      </div>
    </div>

    <template v-else-if="product">
      <div class="grid gap-8 lg:grid-cols-2">
        <img
          :src="product.thumbnailUrl"
          :alt="`${product.name} product image`"
          class="h-96 w-full rounded-3xl object-cover shadow-sm"
        />

        <Card class="border border-slate-200 shadow-sm">
          <template #content>
            <Tag :value="formatCategory(product.category)" severity="info" />

            <h1 class="mt-4 text-3xl font-bold tracking-tight text-slate-950">
              {{ product.name }}
            </h1>

            <p class="mt-4 text-2xl font-bold text-slate-950">
              {{ formatCurrency(product.price) }}
            </p>

            <p class="mt-4 text-slate-700">
              {{ product.shortDescription }}
            </p>

            <p class="mt-4 leading-7 text-slate-600">
              {{ product.longDescription }}
            </p>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <BaseButton :disabled="cartStore.isLoading" @click="addToCart">
                {{ cartStore.isLoading ? 'Adding...' : 'Add to cart' }}
              </BaseButton>

              <RouterLink
                to="/cart"
                class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
              >
                View cart
              </RouterLink>
            </div>

            <Message v-if="successMessage" class="mt-4" severity="success" :closable="false">
              {{ successMessage }}
            </Message>

            <Message v-if="cartStore.error" class="mt-4" severity="error" :closable="false">
              {{ cartStore.error }}
            </Message>
          </template>
        </Card>
      </div>

      <ProductReviews :reviews="product.reviews" />
    </template>
  </section>
</template>
