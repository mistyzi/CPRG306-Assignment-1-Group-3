export const createConverter = (fromUnit, toUnit) => {

    const convertOne = (value) => {
        value = Number(value);

        // Temperature
        if (fromUnit === "celsius" && toUnit === "fahrenheit")
            return round((value * 9/5) + 32);

        if (fromUnit === "fahrenheit" && toUnit === "celsius")
            return round((value - 32) * 5/9);

        // Distance
        const distance = {
            miles: 1.60934,
            kilometres: 1
        };

        if (fromUnit in distance && toUnit in distance)
            return round((value * distance[fromUnit]) / distance[toUnit]);

        // Weight
        const weight = {
            pounds: 0.453592,
            kilograms: 1
        };

        if (fromUnit in weight && toUnit in weight)
            return round((value * weight[fromUnit]) / weight[toUnit]);

        return null; 
    };

    return (input) => {
        if (Array.isArray(input)) {
            return input.map(v => convertOne(v));
        }
        return convertOne(input);
    };
};

export const round = (num) => Number(num.toFixed(4));