"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Confirmation({ searchParams }) {
    const router = useRouter();
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const confirmAccount = async () => {
            if (!searchParams?.confirmation_token) {
                setStatus("error");
                return;
            }

            try {
                const response = await fetch(
                    ` https://olenx-platforms-api.onrender.com/users/confirmation?confirmation_token=${searchParams.confirmation_token}`,
                    { method: "GET" }
                );

                if (!response.ok) {
                    throw new Error("Confirmation failed");
                }

                setStatus("success");

                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            } catch (error) {
                setStatus("error");
            }
        };

        confirmAccount();
    }, [searchParams?.confirmation_token, router]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            {status === "loading" && (
                <div>
                    <h2>Confirmation en cours</h2>
                    <p>Validation de votre compte...</p>
                </div>
            )}

            {status === "success" && (
                <div>
                    <h2>Compte confirmé</h2>
                    <p>Votre compte a été validé avec succès.</p>
                    <p>✅ Compte confirmé ! Redirection...</p>
                    <button onClick={() => router.push("/login")}>
                        Aller à la connexion
                    </button>
                </div>
            )}

            {status === "error" && (
                <div>
                    <h2>Erreur de confirmation</h2>
                    <p>Un problème est survenu lors de la validation.</p>
                    <p>❌ Erreur lors de la confirmation</p>
                    <button onClick={() => router.push("/signup")}>
                        Réessayer l'inscription
                    </button>
                </div>
            )}
        </div>
    );
}
