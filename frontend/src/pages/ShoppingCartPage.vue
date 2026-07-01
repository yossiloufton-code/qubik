<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Message from 'primevue/message';
import CartItemRow from '../components/cart/CartItemRow.vue';
import CartSummary from '../components/cart/CartSummary.vue';
import EmptyCartState from '../components/cart/EmptyCartState.vue';
import BaseErrorState from '../components/shared/BaseErrorState.vue';
import { useCartStore } from '../stores/cart.store';
import { formatCurrency } from '../utils/formatCurrency';

const cartStore = useCartStore();
const { items, totalItems, totalPrice, isEmpty, isLoading, error, lastCheckout } =
  storeToRefs(cartStore);
</script>

<template>
  <section class="space-y-8">
    <section class="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-950/5 backdrop-blur sm:p-8">
      <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p class="text-sm font-bold uppercase tracking-wide text-blue-700">
            Shopping cart
          </p>
          <h1 class="mt-2 text-4xl font-black tracking-tight text-slate-950">
            Review your cart
          </h1>
          <p class="mt-2 max-w-2xl text-slate-600">
            Update quantities, remove products, and complete a mock checkout.
          </p>
        </div>

        <div class="rounded-2xl bg-slate-950 px-5 py-4 text-white">
          <p class="text-sm font-bold text-slate-300">Current total</p>
          <p class="text-2xl font-black">{{ formatCurrency(totalPrice) }}</p>
        </div>
      </div>
    </section>

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

    <div v-else class="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
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
