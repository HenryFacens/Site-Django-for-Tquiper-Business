import {
    storeData,
    loadFormData,
    clearFormData,
    openModal,
    closeModal,
    addCompany,

} from "./utils.js";


import {
    TableA1, TableA2, TableA3, CalculateTotalA,
    TableB1, TableB1A, TableB2, TableB3, TableB4, CalculateTotalB,
    TableC1,
    CalculateTotalC,

} from "./exportsTables.js";

document.addEventListener("DOMContentLoaded", () => {

    // Carrega os dados do localStorage
    loadFormData();

    // Inicializa as tabelas A
    TableA1.setup(storeData, CalculateTotalA);
    TableA2.setup(storeData, CalculateTotalA);
    TableA3.setup(storeData, CalculateTotalA);

    // Botão para limpar todos os dados
    const clearButton = document.getElementById("clearAllCache");

    // Verifica se o botão existe
    if (clearButton) {
        clearButton.addEventListener("click", clearFormData.setup);
    }

    // Botão que abre o modal
    const openModalButton = document.getElementById("openModalSearch");
    // O modal
    const modalSearch = document.getElementById("modalSearch");
    // Botão que fecha o modal
    const closeModalButton = document.getElementById("closeModalSearch");

    if (openModalButton && modalSearch) {
        openModalButton.addEventListener("click", () => {
            openModal(modalSearch);
        });
    }

    if (closeModalButton && modalSearch) {
        closeModalButton.addEventListener("click", () => {
            closeModal(modalSearch);
        });
    }

    addCompany();

    // Inicializa as tabelas B
    TableB1.setup(storeData, CalculateTotalB);
    TableB1A.setup(storeData, CalculateTotalB);
    TableB2.setup(storeData, CalculateTotalB);
    TableB3.setup(storeData, CalculateTotalB);
    TableB4.setup(storeData, CalculateTotalB);

    // Inicializa as tabelas C
    TableC1.setup(storeData, CalculateTotalC);

});
