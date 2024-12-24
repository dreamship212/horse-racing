<template>
  <div class="race-track-container">
    <div class="race-track">
      <div
        v-for="(horse, index) in raceHorses"
        :key="horse.id"
        class="track-lane"
      >
        <div class="lane-number">{{ index + 1 }}</div>
        <div class="lane">
          <div
            class="horse"
            :style="{
              left: `${(horse.position / store.currentDistance) * 90}%`,
            }"
          >
            🏇 {{ horse.name }}
          </div>
        </div>
      </div>
      <!-- Finish Çizgisi -->
      <div class="finish-line">
        <span class="finish-text">FINISH</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useGameStore } from "@/stores/gameStore";

const store = useGameStore();
const raceHorses = ref([]);
const raceInterval = ref(null);

const handleRaceFinish = () => {
  // Yarışı bitiren tüm atların pozisyonlarını kaydet ve sırala
  const finishedHorses = raceHorses.value
    .map((horse) => ({
      name: horse.name,
      position: horse.position,
    }))
    .sort((a, b) => b.position - a.position);

  // Sonuçları store'a kaydet
  if (!store.raceResults) store.raceResults = [];

  store.raceResults.push({
    round: store.currentRound + 1,
    winner: finishedHorses[0].name,
    distance: store.currentDistance,
    rankings: finishedHorses.map((h) => h.name),
  });

  store.currentRound++;
  clearInterval(raceInterval.value);

  if (store.currentRound >= 6) {
    store.isRacing = false;
  } else {
    // Yeni round için bekle
    setTimeout(() => {
      startRace();
    }, 1000);
  }
};

const calculateHorseSpeed = (horse) => {
  const baseSpeed = horse.condition / 100;
  const randomFactor = 0.8 + Math.random() * 0.4;
  return baseSpeed * randomFactor * 5;
};

const startRace = () => {
  raceHorses.value = store.selectedHorses.map((horse) => ({
    ...horse,
    position: 0,
    speed: calculateHorseSpeed(horse),
  }));

  raceInterval.value = setInterval(() => {
    let hasWinner = false;

    raceHorses.value.forEach((horse) => {
      horse.position += horse.speed;

      if (!hasWinner && horse.position >= store.currentDistance) {
        hasWinner = true;
        handleRaceFinish(horse);
      }
    });
  }, 50);
};

onMounted(() => {
  if (store.isRacing) {
    startRace();
  }
});

onUnmounted(() => {
  if (raceInterval.value) {
    clearInterval(raceInterval.value);
  }
});
</script>

<style scoped>
.race-track-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.race-status {
  font-size: 0.9em;
  opacity: 0.9;
}

.race-track {
  position: relative;
  flex: 1;
  border: 1px solid #ddd;
  overflow: hidden;
  background: #f8f9fa;
}

.track-lane {
  display: flex;
  height: 50px;
  border-bottom: 1px dashed #ccc;
  position: relative;
}

.lane-number {
  width: 40px;
  background: #333;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.lane {
  flex: 1;
  position: relative;
}

.horse {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: left 0.05s linear;
  white-space: nowrap;
  z-index: 1;
}

.finish-line {
  position: absolute;
  right: 50px;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    to bottom,
    red 0px,
    red 10px,
    white 10px,
    white 20px
  );
}

.finish-text {
  position: absolute;
  right: -37px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  color: red;
  font-weight: bold;
  white-space: nowrap;
}
</style>
