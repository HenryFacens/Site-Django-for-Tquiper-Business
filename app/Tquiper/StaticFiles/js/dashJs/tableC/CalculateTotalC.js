import { storeData } from "../utils.js";

export const CalculateTotalC = () => {

    const formatCurrency = (value) => {
        return isNaN(value)
            ? ""
            : value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            });
    };

    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    const totalC1 = parseFloat(formData["sum.C1"] || 0);
    const totalC2 = parseFloat(formData["sum.C2"] || 0);
    const totalC3 = parseFloat(formData["sum.C3"] || 0);
    const totalC4 = parseFloat(formData["sum.C4"] || 0);

    const totalC = totalC1 + totalC2 + totalC3 + totalC4;

    const totalField = document.getElementById("totalC");
    if (totalField) {
        totalField.value = formatCurrency(totalC);
    }

    // Atualiza o valor no formData e salva
    formData["totalC"] = totalC;
    localStorage.setItem("formData", JSON.stringify(formData));
    storeData();

}