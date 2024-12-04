import {
    storeData as storeData,
} from "../utils.js";

export const TableE = (storeData = null) => {
    const formatCurrency = (value) => {
        return isNaN(value)
            ? ""
            : value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
            });
    };

    const parseCurrency = (value) => {
        if (typeof value === "string") {
            return parseFloat(
                value
                    .replace("R$", "") // Remove o símbolo de moeda
                    .replace(/\./g, "") // Remove o separador de milhares
                    .replace(",", ".")  // Substitui vírgula pelo ponto decimal
                    .trim()             // Remove espaços extras
            ) || 0;
        }
        return parseFloat(value) || 0;
    };

    const formData = JSON.parse(localStorage.getItem("formData")) || {};
    const totalA = parseCurrency(formData["totalA"] || 0);
    const totalB = parseCurrency(formData["totalB"] || 0);
    const totalC = parseCurrency(formData["totalC"] || 0);
    const totalD = parseCurrency(formData["totalD"] || 0);
    const totalOSC = parseFloat(formData["sum.OSC"] || 0);

    console.log(totalA); // Exibe o valor numérico correto
    console.log(totalB);
    console.log(totalC);
    console.log(totalD);
    console.log(totalOSC);


    const totalGeneral = totalA + totalB + totalC + totalD + totalOSC;
    console.log('teste totalGeneral');
    console.log(totalGeneral);

    // Calcula porcentagens
    const percentA = totalGeneral > 0 ? (totalA / totalGeneral) * 100 : 0;
    console.log(percentA);
    const percentB = totalGeneral > 0 ? (totalB / totalGeneral) * 100 : 0;
    console.log(percentB);
    const percentC = totalGeneral > 0 ? (totalC / totalGeneral) * 100 : 0;
    console.log(percentC);
    const percentD = totalGeneral > 0 ? (totalD / totalGeneral) * 100 : 0;
    console.log(percentD);
    const percentOSC = totalGeneral > 0 ? (totalOSC / totalGeneral) * 100 : 0;

    const rows = document.querySelectorAll("#TableE tr");

    rows.forEach((row) => {
        const taotalAE = row.querySelector("input[id^='E1.1.1']");
        const taotalBE = row.querySelector("input[id^='E1.1.2']");
        const taotalCE = row.querySelector("input[id^='E1.1.3']");
        const taotalDE = row.querySelector("input[id^='E1.1.4']");
        const taotalOSE = row.querySelector("input[id^='E1.1.5']");
        const totalcustos = row.querySelector("input[id^='total.custos']");

        if (totalcustos) {
            totalcustos.value = formatCurrency(totalGeneral);
        }
        if (taotalAE) {
            taotalAE.value = `${percentA.toFixed(2)}%`;
        }

        if (taotalBE) {
            taotalBE.value = `${percentB.toFixed(2)}%`;
        }

        if (taotalCE) {
            taotalCE.value = `${percentC.toFixed(2)}%`;
        }

        if (taotalDE) {
            taotalDE.value = `${percentD.toFixed(2)}%`;
        }
        if (taotalOSE) {
            taotalOSE.value = `${percentOSC.toFixed(2)}%`;
        }

        // Adiciona os valores monetários correspondentes
        const totalCostAE = row.querySelector("input[id^='E1.2.1']");
        const totalCostBE = row.querySelector("input[id^='E1.2.2']");
        const totalCostCE = row.querySelector("input[id^='E1.2.3']");
        const totalCostDE = row.querySelector("input[id^='E1.2.4']");
        const totalCostOSEE = row.querySelector("input[id^='E1.2.5']");

        if (totalCostAE) {
            totalCostAE.value = formatCurrency(totalA);
        }

        if (totalCostBE) {
            totalCostBE.value = formatCurrency(totalB);
        }
        if (totalCostCE) {
            totalCostCE.value = formatCurrency(totalC);
        }
        if (totalCostDE) {
            totalCostDE.value = formatCurrency(totalD);
        }
        if (totalCostOSEE) {
            totalCostOSEE.value = formatCurrency(totalOSC);
        }
        storeData();
    });

}