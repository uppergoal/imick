<script lang="ts" setup>
import axios from "axios";

const submitting = ref(false);
const success = ref(false);
const url = ref();
const category = ref();
const group = ref();

const { data } = useAsyncData("categories", async () =>
  queryContent("/discoveries").find()
);

const items = computed(() =>
  data.value?.map((item) =>
    item._file?.split("/").length === 3
      ? {
          ...item,
          type: "groups",
          parent: item._file?.split("/")[item._file.split("/").length - 2],
        }
      : {
          ...item,
          type: "categories",
          parent: item._file?.split("/")[item._file.split("/").length - 2],
        }
  )
);

const groups = computed(() =>
  items.value?.filter((item) => item.type === "groups")
);

const categories = computed(() =>
  items.value?.filter(
    (item) => item.type === "categories" && item._dir === group.value
  )
);

const executeApi = async () => {
  submitting.value = true;
  const websites = [
    { url: url.value, category: category.value, group: group.value },
  ];

  try {
    const { data } = await axios.post("/api/discovery", { websites });
    url.value = "";
    success.value = true;

    setTimeout(() => {
      success.value = false;
    }, 3000);
    console.log(data.data);
  } catch (err: any) {
    console.log(err);
    alert(`Something went wrong. Please try again. ${err.message}`);
  } finally {
    submitting.value = false;
  }
};
</script>

<template>
  <div class="max-w-3xl mx-auto mt-20 border border-slate-400 rounded-xl p-10">
    <form @submit.prevent="executeApi">
      <div class="space-y-6">
        <div>
          <input
            v-model="url"
            placeholder="www.example.com"
            class="border px-2 py-2 border-slate-300 w-full rounded-xl"
          />
        </div>

        <div class="grid grid-cols-2 gap-5">
          <div>
            <select
              v-model="group"
              class="w-full border border-slate-300 rounded-xl"
            >
              <option v-for="group in groups" :value="group.parent">
                {{ group.title }}
              </option>
            </select>
          </div>
          <div>
            <select
              v-model="category"
              class="w-full border border-slate-300 rounded-xl"
            >
              <option v-for="category in categories" :value="category.parent">
                {{ category.title }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <p>{{ `Url: ${url}` }}</p>
        <p>{{ `Group: ${group}` }}</p>
        <p>{{ `Category: ${category}` }}</p>
      </div>

      <div class="mt-10">
        <button class="bg-teal-400 px-4 py-2 rounded-xl w-full" type="submit">
          {{ submitting ? "Loading..." : "Save" }}
        </button>

        <div
          v-if="success"
          class="flex p-4 border border-green-600 rounded-xl bg-green-100 text-green-700 font-display mt-5"
        >
          🤙 Added!
        </div>
      </div>
    </form>
  </div>
</template>
