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
    TableC1, TableC2, TableC3, TableC4, CalculateTotalC,
    TableD1, TableD2, CalculateTotalD,
    TableOSC, CalculateTotalOSC,
    TableE, CalculateTotalE,
    TableF,
} from "./exportsTables.js";

document.addEventListener("DOMContentLoaded", () => {

    // Carrega os dados do localStorage
    loadFormData();

    // Inicializa as tabelas A
    TableA1.setup(storeData, CalculateTotalA, TableE);
    TableA2.setup(storeData, CalculateTotalA, TableE);
    TableA3.setup(storeData, CalculateTotalA, TableE);

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
    TableB1.setup(storeData, CalculateTotalB, TableE);
    TableB1A.setup(storeData, CalculateTotalB, TableE);
    TableB2.setup(storeData, CalculateTotalB, TableE);
    TableB3.setup(storeData, CalculateTotalB, TableE);
    TableB4.setup(storeData, CalculateTotalB, TableE);

    // Inicializa as tabelas C
    TableC1.setup(storeData, CalculateTotalC, TableE);
    TableC2.setup(storeData, CalculateTotalC, TableE);
    TableC3.setup(storeData, CalculateTotalC, TableE);
    TableC4.setup(storeData, CalculateTotalC, TableE);

    // Inicializa as tabelas D
    TableD1.setup(storeData, CalculateTotalD, TableE);
    TableD2.setup(storeData, CalculateTotalD, TableE);
    // Inicializa a tabela OSC
    TableOSC.setup(storeData, TableE);

    // Inicializa a tabela F
    TableF.setup(storeData);

    TableE();
});
