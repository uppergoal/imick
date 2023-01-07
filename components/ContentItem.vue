<template>
  <NuxtLink :to="href" target="_blank" class="cursor-pointer">
    <div
      class="rounded-xl overflow-hidden relative bg-slate-100 h-full border-slate-50 border-2 border-slate-200/70 hover:border-teal-400 hover:bg-teal-50 transition-colors duration-200 cursor-pointer"
    >
      <div class="h-32 flex flex-1">
        <NuxtImg
          v-if="theImage && !hasError"
          :src="theImage"
          fit="contains"
          loading="lazy"
          class="object-cover w-full object-center"
          :alt="`Image for ${companyName}`"
          @error="errorImg"
        />
        <div
          v-else
          class="bg-gradient-to-br from-green-100 to-teal-500 h-full w-full"
        />
      </div>

      <div
        v-if="category"
        class="text-teal-300 font-light font-display bg-slate-700 px-3 py-0.5 rounded-lg flex items-center absolute top-3 right-3"
      >
        <p class="text-xs ml-1 tracking-wider">
          {{ category }}
        </p>
      </div>

      <div class="p-4">
        <h2 class="font-extrabold capitalize text-2xl text-slate-900">
          {{ companyName }}
        </h2>
        <p class="text-slate-500 text-sm mt-2 line-clamp-3">
          {{ theDescription }}
        </p>

        <slot />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>
interface Props {
  companyName?: string;
  image?: string;
  ogImage?: string;
  twitterImage?: string;
  description?: string;
  ogDescription?: string;
  category?: string | null;
  logo?: string;
  href?: string;
}

const props = withDefaults(defineProps<Props>(), {});

const hasError = ref(false);

const errorImg = () => {
  hasError.value = true;
};

const theImage = computed(() => {
  return props.image || props.ogImage || props.twitterImage;
});
const theDescription = computed(() => {
  return props.description || props.ogDescription;
});
</script>
