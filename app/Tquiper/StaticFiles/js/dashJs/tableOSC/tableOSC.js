export const TableOSC = {
    setup: function (storeData, TableE) {
        const rows = document.querySelectorAll('#TableOSC tr');
        rows.forEach((row) => {
            const inputDescriptions = row.querySelector("input[id^='Z1.1']");
            const inputPrice = row.querySelector("input[id^='Z1.2']");
            const inputFatorUtil = row.querySelector("input[id^='Z1.3']");
            const inputValorUnit = row.querySelector("input[id^='Z1.4']");
            const inputQuant = row.querySelector("input[id^='Z1.5']");
            const inputSubtotal = document.querySelector("input[id^='Z1.6']");
            const inputSumSubtotal = document.getElementById("sum.OSC");
            const calculateSubtotal = () => {
                const price = parseFloat(inputPrice?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const quantity = parseFloat(inputQuant?.value || 0);
                const fatorUtil = parseFloat(inputFatorUtil?.value || 0);
                const ValorUnit = price * fatorUtil;
                if (inputValorUnit) {
                    inputValorUnit.value = isNaN(ValorUnit) ? "" : ValorUnit.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }
                const subtotal = ValorUnit * quantity;
                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? "" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }
                storeData();
                calculateSumSubtotal();
                TableE()
            }

            const calculateSumSubtotal = () => {
                let sum = 0;
                document.querySelectorAll("input[id^='Z1.6']").forEach((input) => {
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
                TableE();

            };
            inputPrice?.addEventListener("input", calculateSubtotal);
            inputQuant?.addEventListener("input", calculateSubtotal);
            inputFatorUtil?.addEventListener("input", calculateSubtotal);
            inputDescriptions?.addEventListener("input", () => { storeData(); });
        });

    }
}
