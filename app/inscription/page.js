"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/styles/pages/inscription.module.scss";
export default function Inscription() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Inscription réussie !");
                router.push("/connexion"); // Rediriger vers la connexion
            } else {
                setError(data.error || "Erreur lors de l'inscription");
            }
        } catch (err) {
            setError("Une erreur est survenue");
            console.error(err);
        }
    };

    return (
        <main className={styles.inscription}>
            <h1>Inscription</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.inscription__form}>
                <input
                    className={styles.inscription__form__input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className={styles.inscription__form__input}
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    className={styles.inscription__form__input}
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className={`${styles.inscription__cta} cta`}
                >
                    S'inscrire
                </button>
            </form>
            <Link href={"/connexion"} className="switch-link">
                Déja un compte ?
            </Link>
        </main>
    );
}
