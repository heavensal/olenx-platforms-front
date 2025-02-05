import { create } from "zustand";

const portfolioStore = create((set) => ({
    portfolio: null, // Données du portfolio
    loading: false, // Indicateur de chargement
    error: null, // Gestion des erreurs

    // Fonction pour récupérer le portfolio
    fetchPortfolio: async (id) => {
        set({ loading: true, error: null });

        try {
            const response = await fetch(`/api/portfolios/${id}`);
            if (!response.ok) {
                throw new Error("Erreur lors du chargement du portfolio");
            }

            const data = await response.json();
            set({ portfolio: data.portfolio, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },

    // Fonction pour réinitialiser l'état du portfolio
    resetPortfolio: () => set({ portfolio: null, error: null, loading: false }),
}));

export default portfolioStore;
