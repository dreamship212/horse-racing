import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, beforeEach, it, expect } from "vitest";
import RaceControls from "../src/components/game/RaceControls.vue";

describe("RaceControls", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("buttons should be enabled/disabled based on race state", () => {
        const wrapper = mount(RaceControls);
        const generateBtn = wrapper.find('[data-test="generate-btn"]');
        const startBtn = wrapper.find('[data-test="start-btn"]');

        expect(generateBtn.attributes("disabled")).toBeFalsy();
        expect(startBtn.attributes("disabled")).toBeTruthy();
    });

    it("should generate horses when generate button clicked", async () => {
        const wrapper = mount(RaceControls);
        const generateBtn = wrapper.find('[data-test="generate-btn"]');

        await generateBtn.trigger("click");
        const store = useGameStore();

        expect(store.horses.length).toBe(20);
        expect(store.selectedHorses.length).toBe(10);
    });
});
