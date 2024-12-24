import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    horses: [],
    selectedHorses: [],
    currentRound: 0,
    isRacing: false,
    raceResults: [],
    roundDistances: [1200, 1400, 1600, 1800, 2000, 2200]
  }),

  getters: {
    currentDistance: (state) => state.roundDistances[state.currentRound] || 0
  }
})