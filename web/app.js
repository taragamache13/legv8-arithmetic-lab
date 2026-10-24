const input = document.getElementById("number");

    
function renderBitCells(bits) {
    const groups = [
        {
            id: "sign-cells",
            value: bits ? bits.slice(0, 1) : "",
            start: 31,
            type: "sign"
        },
        {
            id: "exponent-cells",
            value: bits ? bits.slice(1, 9) : "",
            start: 30,
            type: "exponent"
        },
        {
            id: "fraction-cells",
            value: bits ? bits.slice(9) : "",
            start: 22,
            type: "fraction"
        }
    ];

    const details = document.getElementById("bit-details");

    details.textContent = bits
        ? "Select a bit to see its explanation."
        : "Enter a valid number to inspect its bits.";

    for (const group of groups) {
        const container = document.getElementById(group.id);

        container.replaceChildren();

        [...group.value].forEach((bit, index) => {
            const position = group.start - index;
            const cell = document.createElement("button");

            cell.type = "button";
            cell.className = `bit-cell ${group.type}-cell`;
            cell.textContent = bit;

            cell.title = `${group.type} bit ${position}: ${bit}`;
            cell.setAttribute("aria-label", cell.title);

            cell.addEventListener("click", () => {
                let explanation;

                if (group.type === "sign") {
                    explanation = bit === "0"
                        ? "Sign bit 31: positive sign."
                        : "Sign bit 31: negative sign.";

                } else if (group.type === "exponent") {
                    const weight = 2 ** (position - 23);

                    explanation =
                        `Exponent bit ${position} is ${bit}. ` +
                        `Its weight in the biased exponent is ${weight}.`;

                } else {
                    const power = position - 23;

                    explanation =
                        `Fraction bit ${position} is ${bit}. ` +
                        `Its fraction weight is 2^${power}.`;
                }

                details.textContent = explanation;
            });

            container.appendChild(cell);
        });
    }
}
   
   
    function updateCalculation(bits, stored) {
        const ids = [
            "calc-sign",
            "calc-exponent",
            "calc-significand",
            "calc-formula",
            "calc-result"
        ];

        // Clear the calculation for invalid input.
        if (!bits) {
            ids.forEach(id => {
                document.getElementById(id).textContent = "—";
            });
            return;
        }

        // Extract IEEE 754 fields.
        const signBit = bits[0];
        const exponentBits = bits.slice(1, 9);
        const fractionBits = bits.slice(9);

        const biasedExponent = parseInt(exponentBits, 2);
        const fractionRaw = parseInt(fractionBits, 2);

        const signFactor = signBit === "1" ? -1 : 1;

        // STEP 1: Sign
        document.getElementById("calc-sign").textContent =
            `Sign bit = ${signBit}. ` +
            `Sign factor = ${signFactor}. ` +
            `The number has a ${signBit === "1" ? "negative" : "positive"} sign.`;

        // STEP 2 and 3: Exponent and significand
        let actualExponent;
        let significand;

        if (biasedExponent === 0) {
            actualExponent = -126;
            significand = fractionRaw / (2 ** 23);

            document.getElementById("calc-exponent").textContent =
                "The stored exponent is 0. " +
                "For zero and subnormal values, the exponent field " +
                "uses the special zero encoding.";

            document.getElementById("calc-significand").textContent =
                `No implicit leading 1. ` +
                `Significand = ${fractionRaw} / 2^23 = ${significand}`;

        } else if (biasedExponent === 255) {
            // Infinity or NaN
            const special = fractionRaw === 0 ? "Infinity" : "NaN";

            document.getElementById("calc-exponent").textContent =
                "All exponent bits are 1, indicating a special value.";

            document.getElementById("calc-significand").textContent =
                `Special classification: ${special}`;

            document.getElementById("calc-formula").textContent =
                "The normal floating-point formula does not apply.";

            document.getElementById("calc-result").textContent =
                String(stored);

            return;

        } else {
            actualExponent = biasedExponent - 127;
            significand = 1 + fractionRaw / (2 ** 23);

            document.getElementById("calc-exponent").textContent =
                `Biased exponent = ${biasedExponent}. ` +
                `Actual exponent = ${biasedExponent} - 127 = ${actualExponent}`;

            document.getElementById("calc-significand").textContent =
                `Implicit leading 1 + fraction. ` +
                `Significand = 1 + ${fractionRaw} / 2^23 = ${significand}`;
        }

        // STEP 4: Reconstruct the value
        const reconstructed =
            signFactor * significand * (2 ** actualExponent);

        let formula;

        if (biasedExponent === 0 && fractionRaw === 0) {
            formula = `Signed zero: ${signFactor} × 0 = ` +
                (signBit === "1" ? "-0" : "0");
        } else {
            formula =
                `(${signFactor}) × ${significand} × ` +
                `2^${actualExponent} = ${reconstructed}`;
        }

        document.getElementById("calc-formula").textContent =
            formula;

        document.getElementById("calc-result").textContent =
            Object.is(stored, -0) ? "-0" : String(stored);
    }
    

function updatePrecisionComparison(value) {
    const bits32Element =
        document.getElementById("float32-bits");

    const bits64Element =
        document.getElementById("float64-bits");

    const value32Element =
        document.getElementById("float32-value");

    const value64Element =
        document.getElementById("float64-value");

    const note =
        document.getElementById("precision-note");

    // Clear the comparison when the input is invalid.
    if (value === null) {
        bits32Element.textContent = "—";
        bits64Element.textContent = "—";
        value32Element.textContent = "—";
        value64Element.textContent = "—";

        note.textContent =
            "Enter a valid number to compare precision.";

        return;
    }

    // Create a buffer for IEEE 754 encoding.
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);

    // Encode the number as a 32-bit float.
    view.setFloat32(0, value, false);

    const stored32 = view.getFloat32(0, false);

    const bits32 = view.getUint32(0, false)
        .toString(2)
        .padStart(32, "0");

    // Encode the number as a 64-bit float.
    view.setFloat64(0, value, false);

    const stored64 = view.getFloat64(0, false);

    const bits64 =
        view.getUint32(0, false)
            .toString(2).padStart(32, "0") +
        view.getUint32(4, false)
            .toString(2).padStart(32, "0");

    // Display color-coded sign, exponent, and fraction.
    function displayBits(element, bits, exponentLength) {
        element.replaceChildren();

        const sections = [
            {
                className: "precision-sign",
                text: bits.slice(0, 1)
            },
            {
                className: "precision-exponent",
                text: bits.slice(1, 1 + exponentLength)
            },
            {
                className: "precision-fraction",
                text: bits.slice(1 + exponentLength)
            }
        ];

        for (const section of sections) {
            const span = document.createElement("span");

            span.className = section.className;
            span.textContent = section.text;

            element.append(
                span,
                document.createTextNode(" ")
            );
        }
    }

    displayBits(bits32Element, bits32, 8);
    displayBits(bits64Element, bits64, 11);

    // Display the stored decimal values.
    value32Element.textContent =
        Object.is(stored32, -0)
            ? "-0"
            : String(stored32);

    value64Element.textContent =
        Object.is(stored64, -0)
            ? "-0"
            : String(stored64);

    // Explain the precision difference.
    if (!Number.isFinite(stored32)) {
        note.textContent =
            "This value is too large for finite 32-bit " +
            "floating-point storage, but fits in 64 bits.";

    } else if (Object.is(stored32, stored64)) {
        note.textContent =
            "Both formats produce the same numerical value " +
            "for this input. This does not mean every " +
            "decimal number can be stored exactly.";

    } else {
        note.textContent =
            "The 32-bit representation has less precision " +
            "and rounds the value differently. " +
            "The 64-bit representation retains more " +
            "significant digits. At 17 decimal digits, " +
            "the 64-bit value is " +
            stored64.toPrecision(17) + ".";
    }
}




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

        renderBitCells(null);
        updateCalculation(null, null);
        updatePrecisionComparison(null);
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
    renderBitCells(bits);
    updateCalculation(bits, stored);
    updatePrecisionComparison(value);
}

input.addEventListener("input", updateDisplay);

updateDisplay();