export const TableC3 = {
    setup: function (storeData, CalculateTotalC, TableE) {

        const rows = document.querySelectorAll('#TableC3 tr');

        rows.forEach((row) => {

            const inputDescription = row.querySelector('input[id^="C3.1"]');
            const inputPrice = row.querySelector('input[id^="C3.2"]');
            const inputQuantity = row.querySelector('input[id^="C3.3"]');
            const inputSubtotal = row.querySelector('input[id^="C3.4"]');
            const inputSumTotal = document.getElementById('sum.C3');

            const calculateSubtotal = () => {
                const price = parseFloat(inputPrice?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                const quantity = parseFloat(inputQuantity?.value || 0);
                const subtotal = price * quantity;
                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? '' : subtotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }

                calculateSumTotal();
            };

            const calculateSumTotal = () => {
                let sum = 0;
                document.querySelectorAll('input[id^="C3.4"]').forEach((input) => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                    sum += value;
                });

                if (inputSumTotal) {
                    inputSumTotal.value = sum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }
                storeData();
                CalculateTotalC();
                TableE();

            };

            inputDescription?.addEventListener('change', () => {
                storeData();
            }
            );
            inputPrice?.addEventListener('input', calculateSubtotal);
            inputQuantity?.addEventListener('input', calculateSubtotal);


        });

    }
};