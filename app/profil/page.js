"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profil() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Récupérer le token du localStorage
        const token = localStorage.getItem("token");

        if (!token) {
            // Rediriger vers la page de connexion si le token n'existe pas
            router.push("/connexion");
        } else {
            // Ici, vous pouvez décoder le token JWT pour récupérer les informations de l'utilisateur
            try {
                const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le payload du JWT
                setUser({ email: payload.email }); // Exemple d'utilisateur
            } catch (error) {
                console.error("Token invalide", error);
                localStorage.removeItem("token");
                router.push("/connexion");
            }
        }
    }, [router]);

    const handleLogout = () => {
        // Supprimer le token du localStorage
        localStorage.removeItem("token");
        router.push("/connexion");
    };

    if (!user) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Profil</h1>
            <p>Email: {user.email}</p>
            <button onClick={handleLogout}>Se déconnecter</button>
        </div>
    );
}
