import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import RaceTrack from "../components/game/RaceTrack/RaceTrack.vue";

describe("RaceTrack", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("should start race and update positions", async () => {
        const wrapper = mount(RaceTrack);
        const store = useGameStore();

        // Mock horses
        store.selectedHorses = Array(10)
            .fill()
            .map((_, i) => ({
                id: i,
                name: `Horse ${i}`,
                condition: 50,
            }));

        store.isRacing = true;
        await wrapper.vm.$nextTick();

        const horses = wrapper.findAll(".horse");
        expect(horses.length).toBe(10);
    });

    it("should finish race and record results", async () => {
        const wrapper = mount(RaceTrack);
        const store = useGameStore();

        // Simulate race finish
        wrapper.vm.handleRaceFinish({
            name: "Horse 1",
            position: 1000,
        });

        expect(store.raceResults.length).toBe(1);
        expect(store.raceResults[0].winner).toBe("Horse 1");
    });
});
