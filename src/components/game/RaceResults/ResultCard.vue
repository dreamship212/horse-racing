<template>
  <div class="result-card">
    <div class="result-header">
      {{ result.round }}. Lap - {{ result.distance }}m
    </div>
    <div class="result-content">
      <div v-for="pos in 10" :key="pos" class="position-row">
        <span class="position-number">{{ pos }}</span>
        <span class="horse-name">
          {{ getHorseAtPosition(pos) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultCard',
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  methods: {
    getHorseAtPosition(pos) {
      const horse = this.result.positions?.find(p => p.position === pos)
      return horse ? horse.horseName : '-'
    }
  }
}
</script>

<style scoped>
.result-card {
  background: white;
  border: 1px solid #ddd;
  margin: 10px;
}

.result-header {
  background: #4CAF50;
  color: white;
  padding: 10px;
  font-weight: bold;
}

.result-content {
  padding: 10px;
}

.position-row {
  display: flex;
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.position-number {
  width: 30px;
  font-weight: bold;
}

.horse-name {
  flex: 1;
  padding-left: 10px;
}
</style>