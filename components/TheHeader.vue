<script setup lang="ts">
const nav = [
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Courses",
    to: "/",
  },
  {
    title: "Discover",
    to: "/discover",
  },
];
</script>

<template>
  <header
    class="max-w-7xl relative flex items-center justify-between mx-auto py-1"
  >
    <NuxtLink to="/">
      <img src="~/assets/img/illustration-sm.png" class="h-16 w-16" />
    </NuxtLink>

    <div class="absolute left-1/2 -translate-x-1/2">
      <nav class="space-x-6">
        <NuxtLink
          v-for="item of nav"
          class="px-4 text-lg font-display rounded-lg capitalize hover:bg-slate-100 py-2 text-slate-400 transition-colors duration-300 ease-in-out"
          active-class="text-slate-900"
          :to="item.to"
        >
          {{ item.title }}
        </NuxtLink>
      </nav>
    </div>

    <button
      class="px-6 py-2 bg-slate-900 text-slate-50 rounded-lg font-display"
    >
      Stay in the loop
    </button>
  </header>
</template>
