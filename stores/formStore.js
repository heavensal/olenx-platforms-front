import { create } from "zustand";

const formLabels = [
    {
        id: 0,
        infos: "Nom *",
        type: "text",
        name: "lastName",
        placeholder: "Entrez votre nom",
        required: true,
    },
    {
        id: 1,
        infos: "Prénom *",
        type: "text",
        name: "firstName",
        placeholder: "Entrez votre prénom",
        required: true,
    },

    {
        id: 2,
        infos: "Email *",
        type: "email",
        name: "email",
        placeholder: "exemple@domaine.com",
        required: true,
    },
    {
        id: 3,
        infos: "Téléphone",
        type: "tel",
        name: "telephone",
        placeholder: "+33 1 23 45 67 89",
        required: false,
    },
    {
        id: 4,
        infos: "Entreprise",
        type: "text",
        name: "society",
        placeholder: "Nom de votre entreprise",
        required: false,
    },
    {
        id: 5,
        infos: "SIRET",
        type: "text",
        name: "SIRET",
        placeholder: "123456 789 00012",
        required: false,
    },
];

const formsStore = create((set) => ({
    formLabels,
}));
export default formsStore;
