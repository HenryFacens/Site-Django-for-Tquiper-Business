export const TableA1 = {
    setup: function (storeData, CalculateTotalA, TableE) {

        const rows = document.querySelectorAll("#TableA1 tr");

        rows.forEach(row => {
            const inputPrice = row.querySelector('input[id^="A1.1"]');
            const inputQuantity = row.querySelector('input[id^="A1.2"]');
            const inputSubtotal = row.querySelector('input[id^="A1.3"]');
            const inputSumSubtotal = document.getElementById("sum.A1");
            const inputEncargosPercent = document.getElementById("encargos.A1");
            const inputEncargosValue = document.getElementById("encargos.A1.total");
            const inputTotal = document.getElementById("total.A1");

            const calculateSubtotal = () => {
                const price = parseFloat(inputPrice?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const quantity = parseFloat(inputQuantity?.value || 0);
                const subtotal = price * quantity;

                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? "" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }

                calculateSumSubtotal();
            };

            const calculateSumSubtotal = () => {
                console.log("Calculating sum subtotal...");
                let sum = 0;
                document.querySelectorAll('input[id^="A1.3"]').forEach(input => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                    sum += value;
                });

                if (inputSumSubtotal) {
                    inputSumSubtotal.value = sum.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }
                CalculateTotalA();
                calculateEncargos();
            };

            const calculateEncargos = () => {
                const subtotal = parseFloat(inputSumSubtotal?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const percent = parseFloat(inputEncargosPercent?.value.replace("%", "").trim() || 0);
                const encargosValue = (subtotal * percent) / 100;

                if (inputEncargosValue) {
                    inputEncargosValue.value = encargosValue.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }

                calculateTotal();
            };

            const calculateTotal = () => {
                const subtotal = parseFloat(inputSumSubtotal?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const encargos = parseFloat(inputEncargosValue?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const total = subtotal + encargos;

                if (inputTotal) {
                    inputTotal.value = total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }
                storeData(); // Salva os dados ao calcular
                CalculateTotalA();
                TableE()

            };

            // Adiciona eventos de input
            inputPrice?.addEventListener("input", calculateSubtotal);
            inputQuantity?.addEventListener("input", calculateSubtotal);
            inputEncargosPercent?.addEventListener("input", calculateEncargos);
        });
    },
};