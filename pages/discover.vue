<script lang="ts" setup>
const route = useRoute();

const { data: groups, pending: pendingGroup } = await useAsyncData(
  "tools-groups",
  async () =>
    queryContent("/discoveries/tools")
      .where({ _file: { $contains: "index.md" } })
      .find()
);

const { data, pending, refresh } = await useAsyncData("tools", async () =>
  queryContent("/discoveries/tools")
    .where({
      _file: { $not: { $contains: "index.md" } },
      _dir: route.query?.category,
    })
    .find()
);

watch(
  () => route.query?.category,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="max-w-6xl mx-auto py-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-3">
        <h2 class="text-lg font-bold">Categories</h2>

        <div class="flex flex-col gap-1 mt-4">
          <NuxtLink
            v-for="group in groups"
            class="text-lg text-slate-500 hover:text-slate-900 rounded-lg transition-colors duration-300 ease-in-out"
            :to="{
              query: {
                category:
                  group._path?.split('/')[group._path?.split('/').length - 1],
              },
            }"
          >
            {{ group.title }}
          </NuxtLink>
        </div>
      </div>

      <div class="col-span-9">
        <div class="grid grid-cols-3 auto-cols-max gap-4 mt-6">
          <ContentItem
            v-for="item of data"
            :key="item.title"
            :company-name="item.name"
            :description="item.description"
            :og-image="item.ogImage"
            :twitter-image="item.twitterImage"
            :image="item.image"
            :logo="item.logo"
            :href="item.href"
            :category="
              groups?.find((g) => g._path?.split('/').pop() === item._dir)
                ?.title
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>
