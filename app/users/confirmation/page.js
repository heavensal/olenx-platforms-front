"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const ConfirmationPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter(); // Pour rediriger après la confirmation
    const confirmation_token = searchParams.get("confirmation_token");
    const [message, setMessage] = useState("Confirmation en cours...");

    useEffect(() => {
        if (confirmation_token) {
            fetch(
                `https://olenx-platforms-api.onrender.com/users/confirmation?confirmation_token=${confirmation_token}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de la confirmation.");
                    }
                    return response.json();
                })
                .then((data) => {
                    setMessage(data.message || "Confirmation réussie !");
                    // Rediriger l'utilisateur après confirmation
                    router.push("/connexion"); // Ou une autre page de ton choix
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                    setMessage("Échec de la confirmation. Veuillez réessayer.");
                });
        }
    }, [confirmation_token, router]);

    return (
        <div>
            <h1>Confirmation d'utilisateur</h1>
            <p>{message}</p>
        </div>
    );
};

export default ConfirmationPage;
