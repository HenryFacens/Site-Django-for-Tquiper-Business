export const TableB3 = {
    setup: function (storeData, CalculateTotalB, TableE) {

        const rows = document.querySelectorAll("#TableB3 tr");

        rows.forEach(row => {
            const inputPvalorUnit = row.querySelector('input[id^="B3.1"]');
            const inputQuant = row.querySelector('input[id^="B3.2"]');
            const inputSubtotal = row.querySelector('input[id^="B3.3"]');
            const inputSumSubtotal = document.getElementById("sum.B3");

            const calculateSubtotal = () => {
                const valorUnit = parseFloat(inputPvalorUnit?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const Quant = parseFloat(inputQuant?.value || 0);
                const subtotal = valorUnit * Quant;

                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? "" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }

                calculateSumSubtotal();
            }
            const calculateSumSubtotal = () => {
                let sum = 0;
                document.querySelectorAll('input[id^="B3.3"]').forEach(input => {
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
                storeData();
                CalculateTotalB();
                TableE();

            };

            inputPvalorUnit?.addEventListener("input", calculateSubtotal);
            inputQuant?.addEventListener("input", calculateSubtotal);


        });

    }
};