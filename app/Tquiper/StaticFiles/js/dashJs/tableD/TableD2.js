export const TableD2 = {
    setup: function (storeData, CalculateTotalD, TableE) {
        const rows = document.querySelectorAll("#TableD2 tr");

        rows.forEach((row) => {

            const inputPrice = row.querySelector("input[id^='D2.1']");
            const inputQuantity = row.querySelector("input[id^='D2.2']");
            const inputSubtotal = row.querySelector("input[id^='D2.3']");
            const inputSumSubtotal = document.getElementById("sum.D2");

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
                document.querySelectorAll("input[id^='D2.3']").forEach((input) => {
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

            inputPrice?.addEventListener("input", calculateSubtotal);
            inputQuantity?.addEventListener("input", calculateSubtotal);


        });


    }
}