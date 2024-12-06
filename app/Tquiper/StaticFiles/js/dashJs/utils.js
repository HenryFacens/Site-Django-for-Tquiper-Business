export const storeData = () => {
    const formData = {}; // Objeto para armazenar os dados formatados
    const inputs = document.querySelectorAll("input"); // Seleciona todos os inputs

    inputs.forEach(input => {
        let value = input.value || "0"; // Obtém o valor do input ou define como "0" se vazio
        let id = input.id || ""; // Captura o ID do input

        // Ignorar entradas sem ID
        if (!id || id === "") return;

        // Remove "R$" e ajusta formatação para valores monetários
        if (value.includes("R$")) {
            value = value.replace(/[^\d,-]/g, "").replace(",", "."); // Remove "R$", formata vírgula -> ponto
            value = parseFloat(value) || 0; // Converte para float
        } else {
            // Para outros valores numéricos
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue)) {
                value = numericValue; // Converte para float
            }
        }

        formData[id] = value; // Salva o valor processado no objeto
    });

    localStorage.setItem("formData", JSON.stringify(formData)); // Armazena o objeto formatado no localStorage
};


export const loadFormData = () => {
    const storedData = JSON.parse(localStorage.getItem("formData")) || {};
    Object.keys(storedData).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            let value = storedData[id];

            // Se for um campo de total, removemos a formatação
            if (id.startsWith("total.") || id.startsWith("sum.")) {
                value = value.toString().replace(/[^\d,-]/g, "").replace(",", ".");
                value = parseFloat(value) || 0;
            }

            input.value = value;
        }
    });
};

export const clearFormData = {
    setup: function () {
        localStorage.removeItem("formData");
        location.reload();
    }
};
// Função para abrir e fechar modais
export const openModal = (modalId) => {
    modalId.showModal();
}
export const closeModal = (modalId) => {
    modalId.close();
}

export const addCompany = () => {
    const empresaForm = document.getElementById('empresa-form');
    if (empresaForm) {
        empresaForm.onsubmit = function (event) {
            event.preventDefault();
            const form = event.target;

            // Seleciona o modal que contém o formulário
            const modalElement = document.getElementById("modalSearch");

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
            })
                .then(response => {
                    if (response.ok) {
                        alert('Empresa registrada com sucesso!');
                        closeModal(modalElement);
                    } else {
                        alert('Erro ao registrar a empresa.');
                    }
                })
                .catch(error => {
                    console.error('Erro na requisição:', error);
                    alert('Erro ao registrar a empresa.');
                });
        };
    }
};