<template>
  <div class="race-lane">
    <div class="lane-number">{{ number }}</div>
    <div class="lane-track">
      <div class="horse" :style="horseStyle">
        <div class="horse-icon">🏇</div>
        <div class="horse-info">
          {{ horse.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'RaceLane',
  props: {
    horse: {
      type: Object,
      required: true
    },
    number: {
      type: Number,
      required: true
    },
    distance: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const horseStyle = computed(() => ({
      left: `${(props.horse.position / props.distance) * 100}%`
    }))

    return {
      horseStyle
    }
  }
}
</script>

<style scoped>
.race-lane {
  display: flex;
  height: 50px;
  border-bottom: 1px dashed #ccc;
}

.lane-number {
  width: 30px;
  background-color: #4a4a4a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.lane-track {
  flex: 1;
  position: relative;
  border-right: 1px dashed #ccc;
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: left 0.05s linear;
}

.horse-icon {
  font-size: 20px;
}

.horse-info {
  background: rgba(255,255,255,0.9);
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 12px;
}
</style>