// tableA3.js
export const TableA3 = {
    setup: function (storeData, CalculateTotalA) {
        // Função para formatar valores em moeda
        const formatCurrency = (value) => {
            return isNaN(value)
                ? ""
                : value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                });
        };

        // Função para calcular valores por linha
        const calculateRow = (row, plrPercentage, ptsPercentage) => {
            const salaryInput = row.querySelector('input[id^="A3.1"]');
            const quantityInput = row.querySelector('input[id^="A3.2"]');
            const prlOutput = row.querySelector('input[id^="A3.3"]');
            const ptsOutput = row.querySelector('input[id^="A3.4"]');
            const subtotalOutput = row.querySelector('input[id^="A3.5"]');

            const salary = parseFloat(salaryInput?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
            const quantity = parseFloat(quantityInput?.value || 1);

            const prlValueTransform = salary * quantity * plrPercentage;
            const prlValue = prlValueTransform * 0.0833;
            const ptsValue = salary * ptsPercentage;
            const subtotalValue = prlValue + ptsValue;

            // Atualiza os campos da linha
            if (prlOutput) prlOutput.value = formatCurrency(prlValue);
            if (ptsOutput) ptsOutput.value = formatCurrency(ptsValue);
            if (subtotalOutput) subtotalOutput.value = formatCurrency(subtotalValue);
        };

        // Função para calcular o total da tabela A3 e o geral
        const calculateTotal = () => {
            const rows = document.querySelectorAll("#TableA3 tbody tr");
            let totalSubtotal = 0;

            rows.forEach(row => {
                const subtotalInput = row.querySelector('input[id^="A3.5"]');
                const value = parseFloat(subtotalInput?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                totalSubtotal += value;
            });

            const sumSubtotal = document.getElementById("sum.A3");
            if (sumSubtotal) sumSubtotal.value = formatCurrency(totalSubtotal);

            // Armazena o total de A3 no formData
            const totalA3Field = document.getElementById("total.A3");
            if (totalA3Field) {
                totalA3Field.value = totalSubtotal; // Armazena o valor numérico
            }

            // Atualiza o total geral

            // Salva todos os dados
            storeData();
            CalculateTotalA();

        };

        // Configuração inicial dos cálculos
        const setupCalculationsA3 = () => {
            const rows = document.querySelectorAll("#TableA3 tbody tr");
            const plrInput = document.getElementById("A3.PLR");
            const ptsInput = document.getElementById("A3.PTS");

            // Função para atualizar as linhas
            const updateRows = () => {
                const plrPercentage = parseFloat(plrInput?.value.replace("%", "").trim() || 0) / 100;
                const ptsPercentage = parseFloat(ptsInput?.value.replace("%", "").trim() || 0) / 100;

                rows.forEach(row => calculateRow(row, plrPercentage, ptsPercentage));
                calculateTotal();
                CalculateTotalA();

            };

            // Adiciona eventos de entrada
            rows.forEach(row => {
                const salaryInput = row.querySelector('input[id^="A3.1"]');
                const quantityInput = row.querySelector('input[id^="A3.2"]');

                if (salaryInput) salaryInput.addEventListener("input", updateRows);
                if (quantityInput) quantityInput.addEventListener("input", updateRows);
            });

            if (plrInput) plrInput.addEventListener("input", updateRows);
            if (ptsInput) ptsInput.addEventListener("input", updateRows);

            // Executa a atualização inicial
            updateRows();
        };

        // Inicializar
        setupCalculationsA3();
    },
};
