<template>
  <section class="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
    <h2 class="text-xl font-bold text-slate-950">Your cart is empty</h2>
    <p class="mt-2 text-sm text-slate-600">
      Browse digital products and add something to your cart.
    </p>

    <RouterLink
      to="/products"
      class="mt-5 inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
    >
      Back to products
    </RouterLink>
  </section>
</template>
