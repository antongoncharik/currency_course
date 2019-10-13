export const calculationAmountCurrency = (amount, courseStart, courseEnd, scaleStart, scaleEnd) => {
    return ((amount * courseStart * scaleEnd).toFixed(2) / (courseEnd * scaleStart).toFixed(2)).toFixed(2)
};
