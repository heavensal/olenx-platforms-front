"use client";
import { useEffect, useState } from "react";

export default function Portfolio() {
    const [portfolio, setPortfolio] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPortfolio = async () => {
            const token = localStorage.getItem("token"); // Récupération du token stocké

            if (!token) {
                setError("Aucun token trouvé, veuillez vous connecter.");
                return;
            }

            try {
                const response = await fetch("/api/me/portfolio", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setPortfolio(data);
                } else {
                    setError(
                        data.error ||
                            "Erreur lors de la récupération du portfolio"
                    );
                }
            } catch (err) {
                setError("Une erreur est survenue");
                console.error(err);
            }
        };

        fetchPortfolio();
    }, []);

    return (
        <div>
            <h1>Mon Portfolio</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {portfolio ? (
                <pre>{JSON.stringify(portfolio, null, 2)}</pre>
            ) : (
                <p>Chargement...</p>
            )}
        </div>
    );
}
