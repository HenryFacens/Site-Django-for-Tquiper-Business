export const TableF = {
    setup: function (storeData) {

        const formatCurrency = (value) => {
            return isNaN(value)
                ? ""
                : value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                });
        };

        const parseCurrency = (value) => {
            if (typeof value === "string") {
                return parseFloat(
                    value
                        .replace("R$", "") // Remove o símbolo de moeda
                        .replace(/\./g, "") // Remove o separador de milhares
                        .replace(",", ".")  // Substitui vírgula pelo ponto decimal
                        .trim()             // Remove espaços extras
                ) || 0;
            }
            return parseFloat(value) || 0;
        };

        const formData = JSON.parse(localStorage.getItem("formData")) || {};
        const totalE = parseFloat(formData["total.custos"] || 0);


        const rows = document.querySelectorAll('#TableF tr');

        rows.forEach((row) => {
            const input_porc_BDI = document.getElementById("porc.BDI");
            const total_BDI = document.getElementById("total.BDI");


            const calculateSubtotal = () => {
                const porc = parseFloat(input_porc_BDI?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const totalE = parseFloat(total_BDI?.value.replace(/[^\d,-]/g, "").replace(",", ".") || 0);
                const subtotal = totalE * (porc / 100);
                if (total_BDI) {
                    total_BDI.value = isNaN(subtotal) ? "" : subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        minimumFractionDigits: 2,
                    });
                }
                storeData();
            }

            input_porc_BDI?.addEventListener("input", calculateSubtotal);

        });



    }
};