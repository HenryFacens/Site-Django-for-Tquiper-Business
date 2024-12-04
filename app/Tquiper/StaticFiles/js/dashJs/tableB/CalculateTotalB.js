import { storeData } from "../utils.js";

export const CalculateTotalB = () => {
    const formatCurrency = (value) => {
        return isNaN(value)
            ? ""
            : value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            });
    };
    // Carrega o formData do localStorage
    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    const totalB1 = parseFloat(formData["sum.B1"] || 0);
    const totalB1A = parseFloat(formData["sum.B1A"] || 0);
    const totalB2 = parseFloat(formData["sum.B2"] || 0);
    const totalB3 = parseFloat(formData["sum.B3"] || 0);
    const totalB4 = parseFloat(formData["sum.B4"] || 0);

    const totalB = totalB1 + totalB1A + totalB2 + totalB3 + totalB4;

    const totalField = document.getElementById("totalB");
    if (totalField) {
        totalField.value = formatCurrency(totalB);
    }

    // Atualiza o valor no formData e salva
    formData["totalB"] = totalB;
    localStorage.setItem("formData", JSON.stringify(formData));
    storeData();
};