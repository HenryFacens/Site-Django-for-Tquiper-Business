export const TableC2 = {
    setup: function (storeData, CalculateTotalC, TableE) {
        const rows = document.querySelectorAll('#TableC2 tr');

        rows.forEach((row) => {
            const inputDescription = row.querySelector('input[id^="C2.1"]');
            const inputPrice = row.querySelector('input[id^="C2.2"]');
            const inputQuantity = row.querySelector('input[id^="C2.3"]');
            const inputSubtotal = row.querySelector('input[id^="C2.4"]');
            const inputPrazo = row.querySelector('input[id^="C2.5"]');
            const inputDepreciation = row.querySelector('input[id^="C2.6"]');
            const inputPercent = row.querySelector('input[id^="C2.7"]'); // Input for depreciation percentage
            const inputSumSubtotal = document.getElementById('sum.C2');
            const inputSumDepreciation = document.getElementById('depre.C2');

            const calculateSubtotal = () => {
                const price = parseFloat(inputPrice?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                const quantity = parseFloat(inputQuantity?.value || 0);
                const prazo = parseFloat(inputPrazo?.value || 0);
                const subtotal = price * quantity;
                const deprec = subtotal / prazo;
                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? '' : subtotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }


                const porcentagemDre = document.getElementById('porc.C2');
                const depreciationPercentage = (deprec * 100) / subtotal
                if (inputDepreciation) {
                    inputDepreciation.value = isNaN(deprec) ? '' : deprec.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                    porcentagemDre.value = isNaN(depreciationPercentage) ? '' : depreciationPercentage.toFixed(2) + '%';

                }

                calculateSumSubtotal();
                calculateSumDepreciation();
            };

            const calculateSumSubtotal = () => {
                let sum = 0;
                const c2 = document.querySelectorAll('input[id^="C2.4"]');
                document.querySelectorAll('input[id^="C2.4"]').forEach((input) => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                    sum += value;
                });
                document.querySelectorAll('input[id^="C2.6"]').forEach((input) => {
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

            };

            const calculateSumDepreciation = () => {
                let sumDepreciation = 0;
                document.querySelectorAll('input[id^="C2.6"]').forEach((input) => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                    sumDepreciation += value;
                });

                if (inputSumDepreciation) {
                    inputSumDepreciation.value = sumDepreciation.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }
                storeData();
                CalculateTotalC();
                TableE();

            };

            inputPrice?.addEventListener('input', calculateSubtotal);
            inputQuantity?.addEventListener('input', calculateSubtotal);
            inputPrazo?.addEventListener('input', calculateSubtotal);
            inputDescription?.addEventListener('input', () => {
                storeData();
            });
        });
    }
}
