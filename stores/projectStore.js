import { create } from "zustand";

const projectStore = create((set) => ({
    project: [], // Données du project
    loading: false, // Indicateur de chargement
    error: null, // Gestion des erreurs

    // Fonction pour récupérer le portfolio
    fetchProject: async (id) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(
                `https://olenx-platforms-api.onrender.com/api/v1/projects/${id}`
            );
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du portfolio");
            }

            const data = await response.json();
            console.log(data.project);

            set({ project: data.project, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // Fonction pour réinitialiser l'état du portfolio
    resetProject: () => set({ project: null, error: null, loading: false }),
}));

export default projectStore;
