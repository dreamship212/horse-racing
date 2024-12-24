<template>
  <div class="horse-list-container">
    <div class="horse-list">
    <table>
      <thead>
        <tr>
          <th class="header">Name</th>
          <th class="header">Condition</th>
          <th class="header">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="horse in store.horses" :key="horse.id" class="horse-row">
          <td class="cell">{{ horse.name }}</td>
          <td class="cell">{{ horse.condition }}</td>
          <td class="cell" :class="{ 'racing': isHorseRacing(horse) }">
            {{ isHorseRacing(horse) ? 'Racing' : 'Waiting' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  </div>
 
</template>
<script setup>
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const isHorseRacing = (horse) => {
  return store.selectedHorses.some(h => h.id === horse.id)
}
</script>

<style scoped>
.horse-list-container {
  height: calc(100vh - 200px);
  overflow-y: auto;
}
.horse-list {
  background-color: #90EE90;
  padding: 10px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
}

.header {
  padding: 10px;
  text-align: left;
  font-weight: bold;
  border-bottom: 2px solid #ddd;
}

.horse-row {
  transition: background-color 0.2s;
}

.horse-row:hover {
  background-color: #fff8dc;
}

.cell {
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
}

.racing {
  color: #2c5282;
  font-weight: bold;
}
</style>