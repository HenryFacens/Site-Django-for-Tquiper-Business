export const TableC1 = {
    setup: function (storeData, CalculateTotalC) {

        const rows = document.querySelectorAll('#TableC1 tr');

        rows.forEach((row) => {
            const inputDescripton = row.querySelector('input[id^="C1.1"]');
            const inputPrice = row.querySelector('input[id^="C1.2"]');
            const inputQuantity = row.querySelector('input[id^="C1.3"]');
            const inputReturnCaptal = row.querySelector('input[id^="C1.4"]');
            const inputPrazo = row.querySelector('input[id^="C1.5"]');
            const inputSubtotal = row.querySelector('input[id^="C1.6"]');

            const inputSumSubtotal = document.getElementById('sum.C1');
            const inputReturnCaptalTotal = document.getElementById('rcap.C1');

            const inputPorcent = document.getElementById('porc.C1');

            const calculateSubtotal = () => {
                const price = parseFloat(inputPrice?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                const quantity = parseFloat(inputQuantity?.value || 0);
                const captalReturn = parseFloat(inputPorcent?.value || 0);
                // const returnCaptal = parseFloat(inputReturnCaptal?.value || 0);
                const prazo = parseFloat(inputPrazo?.value || 0);
                console.log(price, quantity, captalReturn, prazo);
                const returnCaptal = (price * quantity) * (captalReturn / 100) / prazo;
                console.log(returnCaptal);
                const subtotal = price + returnCaptal;

                if (inputSubtotal) {
                    inputSubtotal.value = isNaN(subtotal) ? '' : subtotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }
                if (inputReturnCaptal) {
                    inputReturnCaptal.value = isNaN(returnCaptal) ? '' : returnCaptal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }

                calculateSumSubtotal();
            };

            const calculateSumSubtotal = () => {
                console.log('Calculating sum subtotal...');
                let sum = 0;
                document.querySelectorAll('input[id^="C1.6"]').forEach((input) => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                    sum += value;
                });

                let sumReturnCaptal = 0;
                document.querySelectorAll('input[id^="C1.4"]').forEach((input) => {
                    const value = parseFloat(input?.value.replace(/[^\d,-]/g, '').replace(',', '.') || 0);
                    sumReturnCaptal += value;
                });

                if (inputSumSubtotal) {
                    inputSumSubtotal.value = sum.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }
                if (inputReturnCaptalTotal) {
                    inputReturnCaptalTotal.value = sumReturnCaptal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                        minimumFractionDigits: 2,
                    });
                }

                storeData();
                CalculateTotalC();

            };

            inputPrice?.addEventListener('input', calculateSubtotal);
            inputQuantity?.addEventListener('input', calculateSubtotal);
            inputPorcent?.addEventListener('input', calculateSubtotal);
            inputPrazo?.addEventListener('input', calculateSubtotal);
            inputDescripton?.addEventListener('input', () => {
                storeData();
            });

        });

    }

};