import { create } from "zustand";

const userStore = create((set, get) => ({
    user: null, // Données de l'utilisateur connecté
    portfolio: null, // Portfolio de l'utilisateur
    projects: null, // Projets de l'utilisateur
    ideas: null, // Idées de l'utilisateur
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
                projects: data.portfolio.projects,
                ideas: data.portfolio.ideas,
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
        console.log(updatedData.avatar);

        // try {
        //     const token = localStorage.getItem("token");
        //     if (!token)
        //         throw new Error("Aucun token trouvé, veuillez vous connecter.");

        //     const response = await fetch(
        //         "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio",
        //         {
        //             method: "PATCH",
        //             headers: {
        //                 Authorization: `Bearer ${token}`,
        //                 "Content-Type": "application/json",
        //             },
        //             // Envoi du FormData au lieu d'un JSON
        //         }
        //     );

        //     const data = await response.json();
        //     if (!response.ok)
        //         throw new Error(data.error || "Erreur lors de la mise à jour");

        //     set((state) => ({
        //         portfolio: {
        //             ...state.portfolio,
        //             company_name: updatedData.company_name,
        //             description: updatedData.description,
        //             avatar: data.portfolio.avatar || state.portfolio.avatar, // Mettre à jour l'avatar si la réponse en contient un
        //         },
        //         loading: false,
        //     }));

        //     return { success: true, message: "Mise à jour réussie !" };
        // } catch (error) {
        //     set({ error: error.message, loading: false });
        //     return { success: false, message: error.message };
        // }
    },

    // Fonction pour récupérerer les projets
    fetchProjects: async () => {
        try {
            const token = localStorage.getItem("token"); // <-- Ajout de la récupération du token
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");
            const res = await fetch("/api/me/portfolio/projects", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // <-- Corrigé ici
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

            const data = await res.json();
            set({ projects: data });
        } catch (error) {
            console.error("Erreur lors de la récupération des projets:", error);
            set({ error: error.message });
        }
    },
    // Fonction pour créer un projet
    createProject: async (projectData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch("/api/me/portfolio/projects", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // <-- Corrigé ici
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            });

            const data = await response.json();

            if (response.ok) {
                // Recharge directement les projets après la création
                await get().fetchProjects();
            } else {
                console.error(
                    "Erreur lors de la création du projet:",
                    data.error
                );
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
        }
    },
    // Fonction pour supprimer un projet existant
    deleteProject: async (projectId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch(
                `/api/me/portfolio/projects/${projectId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    `Erreur HTTP: ${response.status} - ${
                        errorData.message || errorData.error || "Inconnue"
                    }`
                );
            }

            // Mettre à jour directement l'état en supprimant le projet localement
            set((state) => ({
                projects: state.projects.filter(
                    (project) => project.id !== projectId
                ),
            }));
        } catch (error) {
            console.error("Erreur réseau ou API:", error.message);
        }
    },

    // Fonction pour mettre à jour un projet existant
    updateProject: async (projectId, updatedProjectData) => {
        try {
            console.log(updatedProjectData, "rer-t");

            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch(
                `/api/me/portfolio/projects/${projectId}`,
                {
                    method: "PATCH", // On utilise PATCH pour une mise à jour partielle
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProjectData), // Les données mises à jour du projet
                }
            );

            // Vérification du statut HTTP avant de parser la réponse
            if (!response.ok) {
                // Si la réponse n'est pas ok, on lève une erreur avec le statut et le message
                const errorData = await response.json();
                throw new Error(
                    `Erreur HTTP: ${response.status} - ${
                        errorData.message || errorData.error || "Inconnue"
                    }`
                );
            }

            const data = await response.json();
            console.log("Réponse de l'API:", data);

            // Si la mise à jour est réussie, on recharge les projets
            if (response.ok) {
                await get().fetchProjects(); // Recharge les projets après la mise à jour
            }
        } catch (error) {
            console.error("Erreur réseau ou API:", error.message);
        }
    },

    // Fonction pour déconnecter l'utilisateur
    logout: () => {
        localStorage.removeItem("token"); // Suppression du token
        set({ user: null, portfolio: null, error: null });
    },
}));

export default userStore;
