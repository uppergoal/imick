<script lang="ts" setup>
const { data, pending } = await useAsyncData("languages", async () =>
  queryContent("/languages")
    .where({ _file: { $not: { $contains: "index.yml" } } })
    .find()
);
</script>

<template>
  <div class="max-w-7xl mx-auto py-10">
    <div class="px-8 py-16">
      <div class="grid gap-8 items-start justify-center">
        <div class="relative group">
          <div
            class="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
          ></div>
          <button
            class="relative px-7 py-4 bg-slate-50 rounded-lg leading-none flex items-center divide-x divide-gray-600"
          >
            <span class="flex items-center space-x-5">
              <Icon
                name="heroicons:bookmark"
                class="text-teal-500 h-6 w-6 stroke-2"
              />
              <span class="pr-6 text-slate-700">New Video on Node.js</span>
            </span>
            <span
              class="pl-6 text-indigo-600 group-hover:text-teal-600 transition duration-200"
              >See what's new &rarr;</span
            >
          </button>
        </div>
      </div>
    </div>

    <div class="text-center">
      <div class="pt-6 pb-10">
        <h1 class="sr-only">Introduction</h1>
        <img src="~/assets/img/illustration-md.png" class="h-40 w-40 mx-auto" />

        <div class="mt-10">
          <p class="text-8xl font-display font-medium">Hi, I'm John</p>
          <p>I'm a full-stack developer</p>
        </div>
      </div>

      <div class="flex gap-x-4 justify-center">
        <button
          class="px-10 py-4 bg-teal-400 rounded-lg text-lg text-teal-900 font-display"
        >
          Learning to code
        </button>
        <button
          class="px-10 py-4 bg-slate-100 rounded-lg text-slate-700 text-lg font-display"
        >
          Hire me for your project
        </button>
      </div>
    </div>

    <div class="mt-20 max-w-5xl mx-auto">
      <div class="flex justify-center flex-wrap gap-8">
        <div v-for="lang in data" class="relative group">
          <div
            class="opacity-0 absolute group-hover:opacity-100 px-2 py-1 duration-500 rounded-xl bg-teal-100 top-0 left-1/2 -translate-x-1/2 -translate-y-full text-sm text-teal-700"
          >
            <p class="flex flex-nowrap whitespace-nowrap">
              {{ lang.name }}
            </p>
          </div>

          <NuxtLink :to="lang.website" target="_blank">
            <img
              :key="lang.name"
              class="h-12 aspect-square object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 duration-500"
              :src="`/img/content/languages/${lang.logo}`"
            />
          </NuxtLink>
        </div>
      </div>
    </div>

    <div
      class="mt-20 bg-slate-100 rounded-xl p-10 border-2 border-slate-200/50"
    >
      <h2 class="text-5xl">Goal tracker</h2>
      <NuxtLink
        to="https://streaksapp.com/"
        target="_blank"
        class="uppercase tracking-widest text-slate-400 text-sm inline-flex items-center hover:underline duration-300 ease-in-out transition"
      >
        Inspired by Streaks
        <Icon
          name="heroicons:arrow-top-right-on-square-solid"
          class="h-4 w-4 ml-2"
        />
      </NuxtLink>

      <div class="flex justify-center gap-4">
        <div
          class="h-32 aspect-square bg-green-50 rounded-full border-green-500 border-8 flex items-center justify-center"
        >
          <p class="text-5xl">🏋️‍♀️</p>
        </div>
        <div
          class="h-32 aspect-square bg-purple-50 rounded-full border-purple-500 border-8 flex items-center justify-center"
        >
          <p class="text-5xl">🧠</p>
        </div>
      </div>
    </div>

    <div class="mt-40">
      <h2 class="text-5xl">Most recent Lessons</h2>

      <div>List of most recent lessons</div>
    </div>

    <div class="mt-40">
      <h2 class="text-5xl">Most recent discoveries</h2>

      <div>List of most recent discoveries</div>
    </div>

    <div class="bg-gray-50 min-h-screen flex items-center justify-center px-16">
      <div class="relative w-full max-w-lg">
        <div
          class="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        ></div>
        <div
          class="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        ></div>
        <div
          class="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        ></div>
        <div class="m-8 relative space-y-4">
          <div
            class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8"
          >
            <div class="flex-1">
              <div class="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div class="w-24 h-6 rounded-lg bg-purple-300"></div>
            </div>
          </div>
          <div
            class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8"
          >
            <div class="flex-1">
              <div class="h-4 w-56 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div class="w-20 h-6 rounded-lg bg-yellow-300"></div>
            </div>
          </div>
          <div
            class="p-5 bg-white rounded-lg flex items-center justify-between space-x-8"
          >
            <div class="flex-1">
              <div class="h-4 w-44 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div class="w-28 h-6 rounded-lg bg-pink-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
