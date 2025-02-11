import { useRouter } from "next/router";
import { create } from "zustand";

const userStore = create((set, get) => ({
    user: null, // Données de l'utilisateur connecté
    portfolio: null, // Portfolio de l'utilisateur
    projects: null, // Projets de l'utilisateur
    ideas: null, // Idées de l'utilisateur
    avatar: null,
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
            console.log(data, "données ");

            set({
                user: data.portfolio.user,
                portfolio: data.portfolio,
                projects: data.portfolio.projects,
                ideas: data.portfolio.ideas,
                avatar: data.portfolio.avatar,
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
    // Vérifie si un utilisateur est connecté

    // Fonction pour mettre à jour le portfolio
    updatePortfolio: async (updatedData) => {
        set({ loading: true, error: null });

        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            // Créer l'objet avec les données mises à jour
            const updatedPortfolio = {
                company_name: updatedData.company_name,
                description: updatedData.description,
                avatar: updatedData.avatar,
            };

            // Effectuer la requête PATCH pour mettre à jour le portfolio
            const response = await fetch("/api/me/portfolio", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json", // Envoi des données sous forme de JSON
                },
                body: JSON.stringify(updatedPortfolio), // Envoi des données mises à jour en JSON
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error || "Erreur lors de la mise à jour du portfolio"
                );
            }

            // Mettre à jour le state du store après la réponse réussie
            await get().fetchUser();

            return { success: true, message: "Mise à jour réussie !" };
        } catch (error) {
            set({ error: error.message, loading: false });
            return { success: false, message: error.message };
        }
    },

    //Changer la pp
    updateAvatar: (secureUrl) => {
        set({ avatar: secureUrl });
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

            // Si la mise à jour est réussie, on recharge les projets
            if (response.ok) {
                await get().fetchProjects(); // Recharge les projets après la mise à jour
            }
        } catch (error) {
            console.error("Erreur réseau ou API:", error.message);
        }
    },

    // Fonction pour récupérerer les idées
    fetchIdeas: async () => {
        try {
            const token = localStorage.getItem("token"); // <-- Ajout de la récupération du token
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");
            const res = await fetch("/api/me/portfolio/ideas", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`, // <-- Corrigé ici
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) throw new Error(`Erreur HTTP: ${res.status}`);

            const data = await res.json();
            set({ ideas: data });
        } catch (error) {
            console.error("Erreur lors de la récupération des projets:", error);
            set({ error: error.message });
        }
    },

    // Fonction pour créer une idée
    createIdea: async (ideaData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch("/api/me/portfolio/ideas", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // <-- Corrigé ici
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(ideaData),
            });

            const data = await response.json();

            if (response.ok) {
                // Recharge directement les projets après la création
                await get().fetchIdeas();
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
    deleteIdea: async (ideaId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch(`/api/me/portfolio/ideas/${ideaId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

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
                ideas: state.ideas.filter((idea) => idea.id !== ideaId),
            }));
        } catch (error) {
            console.error("Erreur réseau ou API:", error.message);
        }
    },

    // Fonction pour mettre à jour un projet existant
    updateIdea: async (ideaId, updatedIdeaData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token)
                throw new Error("Aucun token trouvé, veuillez vous connecter.");

            const response = await fetch(`/api/me/portfolio/ideas/${ideaId}`, {
                method: "PATCH", // On utilise PATCH pour une mise à jour partielle
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedIdeaData), // Les données mises à jour du projet
            });

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

            // Si la mise à jour est réussie, on recharge les projets
            if (response.ok) {
                await get().fetchIdeas(); // Recharge les projets après la mise à jour
            }
        } catch (error) {
            console.error("Erreur réseau ou API:", error.message);
        }
    },
    // Fonction pour déconnecter l'utilisateur
    logout: () => {
        localStorage.removeItem("token"); // Suppression du token
        set({ user: null, portfolio: null, error: null });
        const router = useRouter();
        router.push("/");
    },
}));

export default userStore;
