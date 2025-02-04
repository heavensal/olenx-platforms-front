import { create } from "zustand";

const projectsStore = create((set) => ({
    portfolios: [],
    loading: false,
    error: null,

    fetchPortfolios: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch("/api/portfolios/", {
                headers: {
                    Authorization: "Bearer VOTRE_TOKEN",
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            set({ portfolios: data, loading: false });
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            set({ error: error.message, loading: false });
        }
    },
}));

export default projectsStore;
