import { storeData } from "../utils.js";

export const CalculateTotalA = () => {
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
    console.log(formData);
    const totalA1 = parseFloat(formData["total.A1"] || 0);
    const totalA2 = parseFloat(formData["total.A2"] || 0);
    const totalA3 = parseFloat(formData["sum.A3"] || 0);
    console.log(totalA1, totalA2, totalA3);

    const totalA = totalA1 + totalA2 + totalA3;

    const totalField = document.getElementById("totalA");
    if (totalField) {
        totalField.value = formatCurrency(totalA);
    }

    // Atualiza o valor no formData e salva
    formData["totalA"] = totalA;
    localStorage.setItem("formData", JSON.stringify(formData));
    storeData();
};