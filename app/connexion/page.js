"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoyer une requête POST à l'API de connexion
            const response = await fetch(
                "https://olenx-platforms-api.onrender.com/users/sign_in",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user: {
                            email,
                            password,
                        },
                    }),
                }
            );

            if (response.ok) {
                // Récupérer le token JWT depuis les en-têtes de la réponse
                const token = response.headers.get("Authorization");

                if (token) {
                    // Stocker le token dans le localStorage
                    localStorage.setItem("token", token);
                    alert("Connexion réussie !");
                    router.push("/profil"); // Rediriger vers la page de profil
                } else {
                    setError("Token non reçu dans les en-têtes");
                }
            } else {
                // Afficher un message d'erreur
                const data = await response.json();
                setError(data.message || "Erreur lors de la connexion");
            }
        } catch (err) {
            setError("Une erreur est survenue lors de la connexion");
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Connexion</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}
