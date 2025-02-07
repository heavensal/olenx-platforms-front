import { create } from "zustand";

const ideaStore = create((set) => ({
    idea: [], // Données du portfolio
    loading: false, // Indicateur de chargement
    error: null, // Gestion des erreurs

    // Fonction pour récupérer le portfolio
    fetchIdea: async (id) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`/api/ideas/${id}`);
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du portfolio");
            }

            const data = await response.json();
            console.log(data.idea.reactions);

            set({ idea: data.idea, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // Fonction pour réinitialiser l'état du portfolio
    resetIdea: () => set({ idea: null, error: null, loading: false }),
}));

export default ideaStore;
