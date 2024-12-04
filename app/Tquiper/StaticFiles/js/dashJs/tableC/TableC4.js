export const TableC4 = {
    setup: function (storeData, CalculateTotalC, TableE) {

        const rows = document.querySelectorAll('#TableC4 tr');

        rows.forEach((row) => {

            const inputDescription = row.querySelector('input[id^="C4.1"]');
            const inputPrice = row.querySelector('input[id^="C4.2"]');
            const inputQuantity = row.querySelector('input[id^="C4.3"]');
            const inputSubtotal = row.querySelector('input[id^="C4.4"]');
            const inputSumSubtotal = document.getElementById('sum.C4');

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

                calculateSumSubtotal();
            };

            const calculateSumSubtotal = () => {
                let sum = 0;
                document.querySelectorAll('input[id^="C4.4"]').forEach((input) => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                    sum += value;
                });

                if (inputSumSubtotal) {
                    inputSumSubtotal.value = sum.toLocaleString('pt-BR', {
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
            });
            inputPrice?.addEventListener('input', calculateSubtotal);
            inputQuantity?.addEventListener('input', calculateSubtotal);

        });
    }
};
