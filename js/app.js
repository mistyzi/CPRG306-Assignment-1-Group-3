import { createConverter } from "./converters.js";

document.addEventListener("DOMContentLoaded", () => {

    const forms = document.querySelectorAll("[data-form]");

    forms.forEach(form => {
        const input = form.querySelector("[data-input]");
        const fromUnit = form.querySelector("[data-from]");
        const toUnit = form.querySelector("[data-to]");
        const result = form.querySelector("[data-result]");
        const button = form.querySelector("[data-convert]");
        const clear = form.querySelector("[data-clear]");

        button.addEventListener("click", () => {
            const raw = input.value.trim();

            if (raw === "") {
                result.textContent = "Please enter a value.";
                return;
            }

            const from = fromUnit.value;
            const to = toUnit.value;

            if (!from || !to) {
                result.textContent = "Please select both units.";
                return;
            }

            const converter = createConverter(from, to);

            let parsed;

            if (raw.includes(",")) {
                parsed = raw
                    .split(",")
                    .map(v => v.trim())
                    .filter(v => v !== "")
                    .map(Number);
            } else {
                parsed = Number(raw);
            }

            const output = converter(parsed);

            if (output === null || (Array.isArray(output) && output.includes(null))) {
                result.textContent = `Cannot convert from ${from} to ${to}.`;
                return;
            }

            result.textContent = Array.isArray(output)
                ? `Converted: ${output.join(", ")}`
                : `Converted: ${output}`;
        });

        clear.addEventListener("click", () => {
            input.value = "";
            fromUnit.value = "";
            toUnit.value = "";
            result.textContent = "";
        });
    });
});