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
            const response = await fetch("/api/users/sign_in", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                localStorage.setItem("token", data.token);
                console.log(data.token);
                alert("Connexion réussie !");
                router.push("/profil"); // Redirection après connexion
            } else {
                setError(data.error || "Erreur de connexion");
            }
        } catch (err) {
            setError("Une erreur est survenue");
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
