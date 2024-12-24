<template>
  <div class="results-container">
    <div v-if="!store.raceResults?.length" class="no-results">
      No races completed yet
    </div>
    <div v-else class="results-grid">
      <div
        v-for="result in store.raceResults"
        :key="result.round"
        class="result-card"
      >
        <div class="round-header">
          Round {{ result.round }} - {{ result.distance }}m
        </div>
        <div class="rankings">
          <div
            v-for="(horse, index) in result.rankings"
            :key="index"
            :class="['rank-row', { winner: index === 0 }]"
          >
            <div class="position">{{ index + 1 }}</div>
            <div class="horse-name">Horse {{ horse }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from "@/stores/gameStore";

const store = useGameStore();
</script>

<style scoped>
.results-container {
  height: auto;

  padding: 15px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.result-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 250px;
}

.round-header {
  background: #4caf50;
  color: white;
  padding: 12px 15px;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
}

.rankings {
  padding: 12px;
}

.rank-row {
  display: flex;
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
  background: #f8f9fa;
}

.winner {
  background: #e8f5e9;
  font-weight: bold;
}

.position {
  width: 35px;
  font-weight: bold;
  font-size: 1.1em;
}

.horse-name {
  flex: 1;
  font-size: 1.1em;
  padding-left: 10px;
}
</style>
