const input = document.getElementById("number");

        function updateDisplay() {
            const raw = input.value.trim();
            const value = Number(raw);

            if (raw === "" || !Number.isFinite(value)) {
                document.getElementById("message").textContent =
                    "Please enter a valid finite number.";

                for (const id of [
                    "sign", "exponent", "fraction",
                    "stored", "classification",
                    "biased", "actual"
                ]) {
                    document.getElementById(id).textContent = "—";
                }

                return;
            }

            const buffer = new ArrayBuffer(4);
            const view = new DataView(buffer);

            view.setFloat32(0, value, false);

            const stored = view.getFloat32(0, false);

            const bits = view.getUint32(0, false)
                .toString(2)
                .padStart(32, "0");

            const sign = bits.slice(0, 1);
            const exponent = bits.slice(1, 9);
            const fraction = bits.slice(9);

            const biased = parseInt(exponent, 2);
            const fractionValue = parseInt(fraction, 2);

            let classification;
            let actualExponent;

            if (biased === 0) {
                classification = fractionValue === 0
                    ? "Zero" : "Subnormal";

                actualExponent = fractionValue === 0
                    ? "N/A" : -126;

            } else if (biased === 255) {
                classification = fractionValue === 0
                    ? "Infinity" : "NaN";

                actualExponent = "N/A";

            } else {
                classification = "Normal";
                actualExponent = biased - 127;
            }

            document.getElementById("sign").textContent =
                sign;

            document.getElementById("exponent").textContent =
                exponent;

            document.getElementById("fraction").textContent =
                fraction;

            document.getElementById("stored").textContent =
                Object.is(stored, -0) ? "-0" : String(stored);

            document.getElementById("classification").textContent =
                classification;

            document.getElementById("biased").textContent =
                biased;

            document.getElementById("actual").textContent =
                actualExponent;

            document.getElementById("message").textContent =
                !Number.isFinite(stored)
                    ? "This number exceeds the finite float32 range."
                    : "";
        }

        input.addEventListener("input", updateDisplay);

        updateDisplay();