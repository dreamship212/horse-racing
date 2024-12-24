<template>
  <div class="game-container">
    <div class="header">
      <h1 style="color: white">Horse Racing Game</h1>
      <div class="controls">
        <button class="btn generate" @click="handleGenerate">
          GENERATE PROGRAM
        </button>
        <button
          class="btn start"
          @click="handleStart"
          :disabled="!canStartRace"
        >
          {{ store.isRacing ? "PAUSE" : "START" }}
        </button>
      </div>
    </div>

    <div class="main-content">
      <div class="panel horse-list-panel">
        <div class="panel-header">Horse List (1-20)</div>
        <horse-list />
      </div>

      <div class="panel race-track-panel">
        <div class="panel-header">Program</div>

        <div class="race-info" v-if="store.isRacing">
          <div class="current-round">
            Round {{ store.currentRound + 1 }} / 6 ({{
              store.currentDistance
            }}m)
          </div>
          <div class="race-status">Race in progress...</div>
        </div>

        <div class="track-container">
          <race-track v-if="store.isRacing" />
          <div v-else class="no-race">
            Click "Generate Program" to start a new race
          </div>
        </div>
      </div>
      <div style="width: 100%" class="panel results-panel">
        <div class="panel-header">Results</div>
        <race-results />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useGameStore } from "@/stores/gameStore";
import HorseList from "./HorseList/HorseList.vue";
import RaceTrack from "./RaceTrack/RaceTrack.vue";
import RaceResults from "./RaceResults/RaceResults.vue";

export default {
  name: "GameContainer",
  components: {
    HorseList,
    RaceTrack,
    RaceResults,
  },
  setup() {
    const store = useGameStore();

    const canStartRace = computed(() => {
      return store.horses.length > 0 && !store.isRacing;
    });

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
      store.isRacing = !store.isRacing;
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

<style scoped>
.game-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  background-color: #0909ecf5;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-radius: 4px;
}

h1 {
  margin: 0;
  font-size: 24px;
}

.controls {
  display: flex;
  gap: 15px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.generate {
  background-color: #fff;
}

.start {
  background-color: #fff;
}

.main-content {
  display: grid;
  grid-template-columns: 300px 1fr 540px;
  gap: 20px;
}

.panel {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.panel-header {
  padding: 12px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.horse-list-panel {
  background-color: #90ee90;
}

.race-track-panel {
  min-height: 600px;
}

.race-info {
  background: #4a90e2;
  color: white;
  padding: 15px;
  text-align: center;
}

.current-round {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.race-status {
  font-size: 14px;
  opacity: 0.9;
}

.track-container {
  padding: 15px;
}

.no-race {
  text-align: center;
  padding: 40px;
  color: #666;
}

.results-panel .panel-header {
  background-color: #90ee90;
}
</style>
