export const TableD1 = {
    setup: function (storeData, CalculateTotalD, TableE) {
        const rows = document.querySelectorAll("#TableD1 tr");
        rows.forEach((row) => {
            const inputValorUnit = row.querySelector("input[id^='D1.1']");
            const inputQuant = row.querySelector("input[id^='D1.2']");
            const inputSubtotal = row.querySelector("input[id^='D1.3']");
            const inputOthers = document.getElementById("service.D1");
            const inputSumSubtotal = document.getElementById("sum.D1");

            const calculateSubtotal = () => {
                const valorUnit = parseFloat(inputValorUnit?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const quant = parseFloat(inputQuant?.value || 0);
                const subtotal = valorUnit * quant;
                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? "" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }

                CalculateSum();
            };

            const CalculateSum = () => {
                let sum = 0;
                document.querySelectorAll("input[id^='D1.3']").forEach((input) => {
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
                CalculateTotalD();
                TableE();
            };

            inputValorUnit?.addEventListener("input", calculateSubtotal);
            inputQuant?.addEventListener("input", calculateSubtotal);
            inputOthers?.addEventListener("input", () => {
                storeData();
            });

        });



    }
}