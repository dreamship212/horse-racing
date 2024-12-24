import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import HorseList from "../components/game/HorseList/HorseList.vue";

describe("HorseList", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("should display horses with status", () => {
        const store = useGameStore();
        store.horses = [{ id: 1, name: "Horse 1", condition: 80 }];
        store.selectedHorses = [{ id: 1 }];

        const wrapper = mount(HorseList);
        const horseRow = wrapper.find('[data-test="horse-1"]');

        expect(horseRow.text()).toContain("Horse 1");
        expect(horseRow.text()).toContain("Racing");
    });
});
