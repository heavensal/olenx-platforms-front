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
            const token = localStorage.getItem("token"); // Récupération du token

            if (!token) {
                throw new Error("Aucun token trouvé, veuillez vous connecter.");
            }

            // Récupération des données de l'utilisateur
            const response = await fetch("/api/me/portfolio", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

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
            const token = localStorage.getItem("token"); // Récupération du token

            if (!token) {
                throw new Error("Aucun token trouvé, veuillez vous connecter.");
            }

            // Envoi de la requête PATCH au backend
            const response = await fetch("/api/users", {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur lors de la mise à jour");
            }

            // Mise à jour du store avec les nouvelles données
            set((state) => ({
                portfolio: { ...state.portfolio, ...updatedData },
                loading: false,
            }));

            return { success: true, message: "Mise à jour réussie !" };
        } catch (error) {
            console.error("Erreur lors de la mise à jour du portfolio:", error);
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
