<template>
  <section class="soft-card rounded-[2rem] p-10 text-center">
    <span class="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-50 text-blue-700">
      <i class="pi pi-shopping-cart text-2xl" aria-hidden="true" />
    </span>

    <h2 class="mt-5 text-2xl font-black text-slate-950">Your cart is empty</h2>

    <p class="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
      Browse digital products and add something useful to your cart.
    </p>

    <RouterLink
      to="/products"
      class="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      Back to products
    </RouterLink>
  </section>
</template>
