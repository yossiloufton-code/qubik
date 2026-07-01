<template>
  <section class="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
    <p class="text-sm font-semibold uppercase tracking-wide text-blue-700">
      404
    </p>
    <h1 class="mt-3 text-3xl font-bold text-slate-950">
      Page not found
    </h1>
    <p class="mx-auto mt-3 max-w-md text-slate-600">
      The page you are looking for does not exist or was moved.
    </p>

    <RouterLink
      to="/products"
      class="mt-6 inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
    >
      Back to products
    </RouterLink>
  </section>
</template>
