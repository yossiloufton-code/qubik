<script setup lang="ts">
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import type { Review } from '../../types/review';

interface Props {
  reviews: Review[];
}

defineProps<Props>();
</script>

<template>
  <Card class="border border-slate-200 shadow-sm">
    <template #title>
      <div class="flex items-center justify-between gap-4">
        <span>Customer reviews</span>
        <span class="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
          {{ reviews.length }} reviews
        </span>
      </div>
    </template>

    <template #content>
      <div v-if="reviews.length" class="grid gap-4">
        <article
          v-for="review in reviews"
          :key="review.id"
          class="rounded-2xl border border-slate-200 bg-slate-50/70 p-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="grid h-11 w-11 place-items-center rounded-full bg-slate-950 text-sm font-black text-white">
                {{ review.author.charAt(0).toUpperCase() }}
              </span>

              <div>
                <h3 class="font-black text-slate-950">{{ review.author }}</h3>
                <p class="text-xs font-semibold text-slate-500">
                  Verified customer
                </p>
              </div>
            </div>

            <Rating
              :model-value="review.rating"
              readonly
              :cancel="false"
              aria-label="Product rating"
            />
          </div>

          <p class="mt-4 text-sm leading-7 text-slate-600">
            {{ review.comment }}
          </p>
        </article>
      </div>

      <p v-else class="text-sm text-slate-500">
        No reviews yet.
      </p>
    </template>
  </Card>
</template>
