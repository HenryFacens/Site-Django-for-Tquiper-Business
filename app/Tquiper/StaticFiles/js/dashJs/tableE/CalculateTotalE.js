import { storeData } from "../utils.js";

export const CalculateTotalE = () => {
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
    const TotalA = parseFloat(formData["total.A"] || 0);
    const TotalB = parseFloat(formData["total.B"] || 0);
    const TotalC = parseFloat(formData["total.C"] || 0);
    const TotalD = parseFloat(formData["total.D"] || 0);
    const TotalOSC = parseFloat(formData["total.OSC"] || 0);



    const totalE = TotalA + TotalB + TotalC + TotalD + TotalOSC;

    const TableE = document.getElementById("total.custos");
    if (TableE) {
        TableE.value = formatCurrency(totalE);
    }

    formData["totalD"] = totalD;
    localStorage.setItem("formData", JSON.stringify(formData));
    storeData();
}