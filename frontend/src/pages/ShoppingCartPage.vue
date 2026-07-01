<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Message from 'primevue/message';
import CartItemRow from '../components/cart/CartItemRow.vue';
import CartSummary from '../components/cart/CartSummary.vue';
import EmptyCartState from '../components/cart/EmptyCartState.vue';
import BaseErrorState from '../components/shared/BaseErrorState.vue';
import { useCartStore } from '../stores/cart.store';

const cartStore = useCartStore();
const { items, totalItems, totalPrice, isEmpty, isLoading, error, lastCheckout } =
  storeToRefs(cartStore);
</script>

<template>
  <section class="space-y-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">
        Shopping cart
      </p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-slate-950">
        Review your cart
      </h1>
    </div>

    <BaseErrorState
      v-if="error"
      :message="error"
      @retry="cartStore.loadCart"
    />

    <Message
      v-if="lastCheckout"
      severity="success"
      :closable="false"
    >
      Checkout completed. Mock order {{ lastCheckout.orderId }} was created successfully.
    </Message>

    <EmptyCartState v-if="isEmpty" />

    <div v-else class="grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
      <div class="space-y-4">
        <CartItemRow
          v-for="item in items"
          :key="item.productId"
          :item="item"
          :disabled="isLoading"
          @update-quantity="cartStore.updateQuantity"
          @remove="cartStore.removeItem"
        />
      </div>

      <CartSummary
        :total-items="totalItems"
        :total-price="totalPrice"
        :disabled="isLoading"
        @checkout="cartStore.checkout"
        @clear="cartStore.clearCart"
      />
    </div>
  </section>
</template>
