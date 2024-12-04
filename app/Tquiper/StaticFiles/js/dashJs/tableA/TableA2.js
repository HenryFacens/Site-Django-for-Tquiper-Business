export const TableA2 = {
    setup: function (storeData, CalculateTotalA, TableE) {
        const rows = document.querySelectorAll("#TableA2 tr");

        rows.forEach(row => {
            // Seleciona os inputs de uma linha
            const inputPrice = row.querySelector('input[id^="A2.1"]');
            const inputQuantity = row.querySelector('input[id^="A2.2"]');
            const inputSubtotal = row.querySelector('input[id^="A2.3"]');

            // Seleciona os campos globais
            const inputSumSubtotal = document.getElementById("sum.A2");
            const inputEncargosPercent = document.getElementById("encargos.A2");
            const inputEncargosValue = document.getElementById("encargos.A2.total");
            const inputTotal = document.getElementById("total.A2");

            /**
             * Calcula o subtotal de uma linha
             */
            const calculateSubtotal = () => {
                const price = parseFloat(inputPrice?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const quantity = parseFloat(inputQuantity?.value || 0);
                const subtotal = price * quantity;

                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal)
                        ? ""
                        : subtotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 2,
                        });
                }

                calculateSumSubtotal();
                const totalA2Field = document.getElementById("total.A2");
                if (totalA2Field) {
                    totalA2Field.value = total; // Armazena o valor numérico
                }

                storeData(); // Salva após o cálculo
            };

            /**
             * Calcula a soma dos subtotais da tabela
             */
            const calculateSumSubtotal = () => {
                let sum = 0;
                document.querySelectorAll('input[id^="A2.3"]').forEach(input => {
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

                calculateEncargos();
            };

            /**
             * Calcula o valor dos encargos
             */
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

            /**
             * Calcula o total da tabela (subtotal + encargos)
             */
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
                storeData(); // Salva após o cálculo
                CalculateTotalA();
                TableE()
            };

            // Adiciona eventos de input para os cálculos
            inputPrice?.addEventListener("input", calculateSubtotal);
            inputQuantity?.addEventListener("input", calculateSubtotal);
            inputEncargosPercent?.addEventListener("input", calculateEncargos);
        });
    },
};