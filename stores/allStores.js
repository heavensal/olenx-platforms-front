import { create } from "zustand";

const allStore = create((set) => ({
    portfolios: [],
    ideas: [],
    projects: [],
    all: [], // Initialisation vide

    loading: false,
    error: null,

    fetchPortfolios: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch("/api/portfolios", {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();

            set((state) => {
                const portfolios = data.map((item) => ({
                    ...item,
                    id: `portfolio-${item.id}`, // Ajout d'un préfixe
                }));
                return {
                    portfolios,
                    all: [...portfolios, ...state.ideas, ...state.projects], // Mise à jour dynamique de `all`
                    loading: false,
                };
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            set({ error: error.message, loading: false });
        }
    },

    fetchProjects: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch("/api/projects/", {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            set((state) => {
                const projects = data.map((item) => ({
                    ...item,
                    id: `project-${item.id}`, // Ajout d'un préfixe
                }));
                return {
                    projects,
                    all: [...state.portfolios, ...state.ideas, ...projects], // Mise à jour dynamique de `all`
                    loading: false,
                };
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            set({ error: error.message, loading: false });
        }
    },

    fetchIdeas: async () => {
        set({ loading: true, error: null });

        try {
            const response = await fetch("/api/ideas/", {
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            set((state) => {
                const ideas = data.map((item) => ({
                    ...item,
                    id: `idea-${item.id}`, // Ajout d'un préfixe
                }));
                return {
                    ideas,
                    all: [...state.portfolios, ...ideas, ...state.projects], // Mise à jour dynamique de `all`
                    loading: false,
                };
            });
        } catch (error) {
            console.error("Erreur lors de la récupération des données:", error);
            set({ error: error.message, loading: false });
        }
    },
}));

export default allStore;
