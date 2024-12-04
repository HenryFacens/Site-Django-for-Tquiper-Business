export const TableB1 = {
    setup: function (storeData, CalculateTotalB, TableE) {

        const rows = document.querySelectorAll("#TableB1 tr");

        rows.forEach(row => {
            const inputPrice = row.querySelector('input[id^="B1.1"]');
            const inputQuantity = row.querySelector('input[id^="B1.2"]');
            const inputSubtotal = row.querySelector('input[id^="B1.3"]');
            const inputSumSubtotal = document.getElementById("sum.B1");


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
                let sum = 0;
                document.querySelectorAll('input[id^="B1.3"]').forEach(input => {
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
            inputPrice?.addEventListener("input", calculateSubtotal);
            inputQuantity?.addEventListener("input", calculateSubtotal);
        });

    }
}