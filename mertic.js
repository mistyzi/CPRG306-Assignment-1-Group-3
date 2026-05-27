



//ok here is how it work ok so we have a simple metric converter that can convert between different units of measurement. The user can input a value, select the unit they want to convert from, and select the unit they want to convert to. When they click the "Convert" button, the conversion is performed and the result is displayed on the page. If the user clicks the "Clear" button, all inputs are reset and the result is cleared. 
// we import the necessary elements from the HTML document and add event listeners to the buttons. The conversion logic is handled in the `convertUnits` function, which checks the type of units being converted (temperature, length, or mass) and performs the appropriate calculations. The `formatUnit` function is used to display the units in a user-friendly format, and the `round` function ensures that the results are rounded to four decimal places for better readability.
document.addEventListener("DOMContentLoaded", () => {
    const inputValue = document.getElementById("inputValue");
    const inputUnit = document.getElementById("inputUnit");
    const outputUnit = document.getElementById("outputUnit");
    const convertButton = document.getElementById("convertButton");
    const clearButton = document.getElementById("clearButton");
    const result = document.getElementById("result");
// we add event listeners to the buttons to handle the conversion and clearing of inputs. When the "Convert" button is clicked, we parse the input value, check for valid inputs, and call the `convertUnits` function to perform the conversion. The result is then displayed on the page. When the "Clear" button is clicked, all inputs are reset and the result is cleared.
    convertButton.addEventListener("click", () => {
        const value = parseFloat(inputValue.value);
        const from = inputUnit.value;
        const to = outputUnit.value;
// i used the isana function here so that if they enter something that is not a number, it will display an error message instead of trying to perform the conversion. We also check if both units are selected and if they are the same, in which case we simply display the input value without conversion. If the conversion is successful, we display the result; otherwise, we show an error message indicating that the conversion is not supported.   
        if (isNaN(value)) {
            result.textContent = "Please enter a valid number.";
            return;
        }
// then the code checks if both the "from" and "to" units are selected. If either of them is not selected, it displays an error message prompting the user to select both units. If both units are the same, it simply displays the input value with the unit without performing any conversion. Finally, if the conversion is successful, it displays the converted value; if not, it shows an error message indicating that the conversion between those units is not supported.  
        if (!from || !to) {
            result.textContent = "Please select both units.";
            return;
        }

        if (from === to) {
            result.textContent = `${formatUnit(from, value)} = ${formatUnit(to, value)}`;
            return;
        }

        const converted = convertUnits(value, from, to);

        if (converted === null) {
            result.textContent = "Conversion between those units is not supported.";
        } else {
            result.textContent = `${value} ${formatUnit(from)} = ${converted} ${formatUnit(to)}`;
        }
    });
// the "Clear" button event listener resets all input fields and the result display, allowing the user to start a new conversion without any previous data lingering on the page. It also sets the focus back to the input value field for convenience.
    clearButton.addEventListener("click", () => {
        inputValue.value = "";
        inputUnit.value = "";
        outputUnit.value = "";
        result.textContent = "";
        inputValue.focus();
    });
});
// the `convertUnits` function defines the conversion factors for temperature, length, and mass. It checks which type of conversion is being requested and calls the appropriate conversion function or performs the necessary calculations. If the conversion is not supported, it returns null.
function convertUnits(value, from, to) {
    const temperature = {
        celsius: "celsius",
        fahrenheit: "fahrenheit"
    };

    const length = {
        meters: 1,
        kilometers: 1000,
        feet: 0.3048,
        inches: 0.0254
    };

    const mass = {
        kilograms: 1,
        grams: 0.001,
        pounds: 0.453592
    };

    if (from in temperature && to in temperature) {
        return convertTemperature(value, from, to);
    }

    if (from in length && to in length) {
        return round((value * length[from]) / length[to]);
    }

    if (from in mass && to in mass) {
        return round((value * mass[from]) / mass[to]);
    }

    return null;
}

function convertTemperature(value, from, to) {
    if (from === "celsius" && to === "fahrenheit") {
        return round((value * 9) / 5 + 32);
    }

    if (from === "fahrenheit" && to === "celsius") {
        return round(((value - 32) * 5) / 9);
    }

    return value;
}

function formatUnit(unit, value) {
    const labels = {
        celsius: "°C",
        fahrenheit: "°F",
        meters: "m",
        kilometers: "km",
        feet: "ft",
        inches: "in",
        kilograms: "kg",
        grams: "g",
        pounds: "lb"
    };

    if (value !== undefined) {
        return `${value} ${labels[unit] || unit}`;
    }

    return labels[unit] || unit;
}

function round(number) {
    return Number(number.toFixed(4));
}

