<template>
  <section class="soft-card mx-auto max-w-2xl rounded-[2rem] p-10 text-center">
    <span class="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-50 text-blue-700">
      <i class="pi pi-compass text-2xl" aria-hidden="true" />
    </span>

    <p class="mt-5 text-sm font-black uppercase tracking-wide text-blue-700">
      404
    </p>

    <h1 class="mt-3 text-4xl font-black tracking-tight text-slate-950">
      Page not found
    </h1>

    <p class="mx-auto mt-3 max-w-md text-slate-600">
      The page you are looking for does not exist or was moved.
    </p>

    <RouterLink
      to="/products"
      class="mt-6 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-black text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
    >
      Back to products
    </RouterLink>
  </section>
</template>
