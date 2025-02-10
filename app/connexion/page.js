"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages/connexion.module.scss";
import Link from "next/link";

export default function Connexion() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isRedirecting, setIsRedirecting] = useState(true); // État pour gérer la redirection
    const router = useRouter();

    // Vérification du token dans localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Si un token est trouvé, redirige vers le portfolio
            router.push("/me/portfolio");
        } else {
            // Si pas de token, continue le rendu de la page de connexion
            setIsRedirecting(false);
        }
    }, [router]);

    if (isRedirecting) {
        // Retourne null pour éviter de rendre la page avant la redirection
        return null;
    }

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
                router.push("/me/portfolio"); // Redirection après connexion
            } else {
                setError(data.error || "Erreur de connexion");
            }
        } catch (err) {
            setError("Une erreur est survenue");
            console.error(err);
        }
    };

    return (
        <main className={styles.connexion}>
            <h1 className={styles.connexion__title}>Connexion</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.connexion__form}>
                <input
                    className={styles.connexion__form__input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.connexion__form__input}
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className={`${styles.connexion__cta} cta`}
                    type="submit"
                >
                    Se connecter
                </button>
            </form>
            <Link href={"/inscription"} className="switch-link">
                Pas encore de compte ?
            </Link>
        </main>
    );
}
