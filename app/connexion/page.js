"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages/connexion.module.scss";
import Link from "next/link";

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
