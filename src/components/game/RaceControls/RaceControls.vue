<template>
  <div class="mb-4 flex gap-4">
    <button
      @click="handleGenerate"
      :disabled="store.isRacing"
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      Generate Program
    </button>

    <button
      @click="handleStart"
      :disabled="!canStartRace"
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      Start Race
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useGameStore } from "@/stores/gameStore";

export default {
  name: "RaceControls",
  setup() {
    const store = useGameStore();

    const canStartRace = computed(
      () => store.horses.length > 0 && !store.isRacing
    );

    const generateHorses = () => {
      const colors = [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Purple",
        "Orange",
        "Pink",
        "Brown",
        "Gray",
        "Cyan",
        "Magenta",
        "Lime",
        "Teal",
        "Indigo",
        "Violet",
        "Gold",
        "Silver",
        "Bronze",
        "White",
        "Black",
      ];

      return Array.from({ length: 20 }, (_, index) => ({
        id: index + 1,
        name: `Horse ${index + 1}`,
        color: colors[index],
        condition: Math.floor(Math.random() * 100) + 1,
      }));
    };

    const selectRandomHorses = () => {
      const available = [...store.horses];
      const selected = [];

      for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * available.length);
        selected.push(...available.splice(randomIndex, 1));
      }

      return selected;
    };

    const handleGenerate = () => {
      store.horses = generateHorses();
      store.currentRound = 0;
      store.raceResults = [];
      store.isRacing = false;
      store.selectedHorses = selectRandomHorses();
    };

    const handleStart = () => {
      store.isRacing = true;
    };

    return {
      store,
      canStartRace,
      handleGenerate,
      handleStart,
    };
  },
};
</script>
