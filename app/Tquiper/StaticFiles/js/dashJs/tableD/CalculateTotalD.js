import { storeData } from "../utils.js";

export const CalculateTotalD = () => {

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
    console.log(formData);
    const totalD1 = parseFloat(formData["sum.D1"] || 0);
    const totalD2 = parseFloat(formData["sum.D2"] || 0);
    console.log(totalD1, totalD2);

    const totalD = totalD1 + totalD2;

    const totalField = document.getElementById("totalD");
    if (totalField) {
        totalField.value = formatCurrency(totalD);
    }

    // Atualiza o valor no formData e salva
    formData["totalD"] = totalD;
    localStorage.setItem("formData", JSON.stringify(formData));
    storeData();


};