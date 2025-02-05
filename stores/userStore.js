import { create } from "zustand";

const userStore = create((set, get) => ({
    user: null, // Données de l'utilisateur connecté
    portfolio: null, // Portfolio de l'utilisateur
    loading: false, // État de chargement
    error: null, // Erreur éventuelle

    // Fonction pour récupérer l'utilisateur connecté et son portfolio
    fetchUser: async () => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch("/api/me/portfolio", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok)
                throw new Error(`Erreur HTTP: ${response.status}`);

            const data = await response.json();

            set({
                user: data.user,
                portfolio: data.portfolio,
                loading: false,
            });
        } catch (error) {
            console.error(
                "Erreur lors de la récupération de l'utilisateur:",
                error
            );
            set({ error: error.message, loading: false });
        }
    },

    // Fonction pour mettre à jour le portfolio
    updatePortfolio: async (updatedData) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch("/api/me/portfolio", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    portfolio: {
                        company_name: updatedData.company_name,
                        description: updatedData.description,
                    },
                }),
            });

            const data = await response.json();
            if (!response.ok)
                throw new Error(data.error || "Erreur lors de la mise à jour");

            set((state) => ({
                portfolio: {
                    ...state.portfolio,
                    company_name: updatedData.company_name,
                    description: updatedData.description,
                },
                loading: false,
            }));

            return { success: true, message: "Mise à jour réussie !" };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    // Fonction pour créer un projet
    createProject: async (projectData) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch(
                "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/projects.json",
                {
                    method: "POST",
                    headers: {
                        Authorization: ` ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(projectData),
                }
            );
            const data = await response.json();

            if (response.ok) {
                get().fetchUser(); // Recharger les données pour voir le nouveau projet
            } else {
                console.error("Erreur lors de la création :", data.message);
            }
        } catch (err) {
            console.error("Erreur lors de la création :", err);
        }
    },

    // Fonction pour mettre à jour un projet existant
    updateProject: async (projectId, updatedProjectData) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch(
                `https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/projects/${projectId}.json`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProjectData),
                }
            );
            const data = await response.json();

            if (response.ok) {
                // Mettre à jour le portfolio local avec les nouvelles informations
                set((state) => ({
                    portfolio: {
                        ...state.portfolio,
                        projects: state.portfolio.projects.map((project) =>
                            project.id === projectId
                                ? { ...project, ...updatedProjectData }
                                : project
                        ),
                    },
                    loading: false,
                }));

                return {
                    success: true,
                    message: "Mise à jour du projet réussie !",
                };
            } else {
                throw new Error(
                    data.error || "Erreur lors de la mise à jour du projet"
                );
            }
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    // Fonction pour déconnecter l'utilisateur
    logout: () => {
        localStorage.removeItem("token"); // Suppression du token
        set({ user: null, portfolio: null, error: null });
    },
}));

export default userStore;
