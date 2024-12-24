<template>
  <tr class="border-b hover:bg-gray-50">
    <td class="p-2">{{ name }}</td>
    <td class="p-2">
      <div class="flex items-center gap-2">
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-green-600 h-2 rounded-full"
            :style="{ width: `${condition}%` }"
          ></div>
        </div>
        <span class="text-sm">{{ condition }}</span>
      </div>
    </td>
    <td class="p-2">
      <span
        :class="[
          'px-2 py-1 rounded text-sm',
          isRacing ? 'bg-green-100 text-green-800' : 'bg-gray-100',
        ]"
      >
        {{ isRacing ? "Racing" : "Waiting" }}
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "HorseCard",
  props: {
    name: String,
    condition: Number,
    isRacing: Boolean,
  },
};
</script>
