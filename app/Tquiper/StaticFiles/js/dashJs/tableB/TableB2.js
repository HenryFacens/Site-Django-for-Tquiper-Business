export const TableB2 = {
    setup: function (storeData, CalculateTotalB, TableE) {
        const rows = document.querySelectorAll("#TableB2 tr");

        rows.forEach(row => {
            const inputPriceUnit = row.querySelector('input[id^="B2.1"]');
            const inputPorcent = row.querySelector('input[id^="B2.2"]');
            const inputValorUnit = row.querySelector('input[id^="B2.3"]');
            const inputQuant = row.querySelector('input[id^="B2.4"]');
            const inputSubtotal = row.querySelector('input[id^="B2.5"]');
            const inputSumSubtotal = document.getElementById("sum.B2");

            const calculateSubtotal = () => {
                const priceUnit = parseFloat(inputPriceUnit?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const porcent = parseFloat(inputPorcent?.value || 0);
                const Quant = parseFloat(inputQuant?.value || 0);
                const subtotal = ((priceUnit * porcent) / 100) * Quant;

                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? "" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                    inputValorUnit.value = isNaN(priceUnit) ? "" : priceUnit.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }

                calculateSumSubtotal();
            }
            const calculateSumSubtotal = () => {
                let sum = 0;
                document.querySelectorAll('input[id^="B2.5"]').forEach(input => {
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

            inputPriceUnit?.addEventListener("input", calculateSubtotal);
            inputPorcent?.addEventListener("input", calculateSubtotal);
            inputQuant?.addEventListener("input", calculateSubtotal);
        });

    }
};