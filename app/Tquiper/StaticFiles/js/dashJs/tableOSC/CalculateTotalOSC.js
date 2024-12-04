export const CalculateTotalOSC = () => {
    const sumOSC = document.getElementById("sum.OSC");
    const sumOSCValue = parseFloat(sumOSC?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
    const sumOSCFormatted = sumOSCValue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });

    const totalOSC = document.getElementById("totalOSC");
    totalOSC.value = sumOSCFormatted;
};