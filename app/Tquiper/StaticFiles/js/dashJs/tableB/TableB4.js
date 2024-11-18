export const TableB4 = {
    setup: function (storeData, CalculateTotalB) {
        console.log("Setting up TableB4...");
        const rows = document.querySelectorAll("#TableB4 tr");

        rows.forEach(row => {
            const inputValorUnit = row.querySelector('input[id^="B4.1"]');
            const inputQuant = row.querySelector('input[id^="B4.2"]');
            const inputSubtotal = row.querySelector('input[id^="B4.3"]');
            const inputSumSubtotal = document.getElementById("sum.B4");

            const calculateSubtotal = () => {
                const valorUnit = parseFloat(inputValorUnit?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const Quant = parseFloat(inputQuant?.value || 0);
                const subtotal = valorUnit / Quant;

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
                console.log("Calculating sum subtotal...");
                let sum = 0;
                document.querySelectorAll('input[id^="B4.3"]').forEach(input => {
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
            };

            inputValorUnit?.addEventListener("input", calculateSubtotal);
            inputQuant?.addEventListener("input", calculateSubtotal);

        })



    }


};