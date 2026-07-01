<script setup lang="ts">
import type { Review } from '../../types/review';

interface Props {
  reviews: Review[];
}

defineProps<Props>();
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <h2 class="text-xl font-bold text-slate-950">Reviews</h2>

    <div v-if="reviews.length" class="mt-4 space-y-4">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="rounded-xl border border-slate-200 p-4"
      >
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h3 class="font-semibold text-slate-950">{{ review.author }}</h3>
          <p class="text-sm font-semibold text-amber-600" :aria-label="`${review.rating} out of 5 stars`">
            ★ {{ review.rating }}/5
          </p>
        </div>

        <p class="mt-2 text-sm leading-6 text-slate-600">
          {{ review.comment }}
        </p>
      </article>
    </div>

    <p v-else class="mt-4 text-sm text-slate-500">
      No reviews yet.
    </p>
  </section>
</template>
