export const TableB1A = {
    setup: function (storeData, CalculateTotalB) {
        console.log("Setting up TableB1A...");
        const rows = document.querySelectorAll("#TableB1A tr");

        rows.forEach(row => {
            const inputPriceYear = row.querySelector('input[id^="B1A.1"]');
            const inputQuantityMes = row.querySelector('input[id^="B1A.2"]');
            const inputQuantityClient = row.querySelector('input[id^="B1A.3"]');
            const inputRateio = row.querySelector('input[id^="B1A.4"]');
            const inputParcela = row.querySelector('input[id^="B1A.5"]');
            const inputSumSubtotal = document.getElementById("sum.B1A");


            const calculateSubtotal = () => {
                const priceYear = parseFloat(inputPriceYear?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const quantityMes = parseFloat(inputQuantityMes?.value || 0);
                const quantityClient = parseFloat(inputQuantityClient?.value || 0);
                const subtotal = (priceYear / quantityMes) / quantityClient;
                const rateio = subtotal

                if (inputParcela) {
                    inputParcela.value = isNaN(subtotal) ? "0" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                    inputRateio.value = isNaN(rateio) ? "0" : rateio.toLocaleString("pt-BR", {
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
                document.querySelectorAll('input[id^="B1A.5"]').forEach(input => {
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
            inputPriceYear?.addEventListener("input", calculateSubtotal);
            inputQuantityMes?.addEventListener("input", calculateSubtotal);
            inputQuantityClient?.addEventListener("input", calculateSubtotal);

        });



    }

};