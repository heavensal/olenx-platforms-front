export async function GET(req) {
    try {
        // Récupérer le token depuis les headers de la requête
        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification requis" }),
                { status: 401 }
            );
        }

        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio.json",
            {
                method: "GET",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: "Erreur lors du chargement du portfolio",
                }),
                { status: response.status }
            );
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        // Récupérer le token depuis les headers de la requête
        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification requis" }),
                { status: 401 }
            );
        }

        // Récupérer les données envoyées dans la requête (par exemple, un formulaire avec avatar, nom, etc.)
        const body = await req.json();

        // Vérifie que les données nécessaires sont présentes
        if (!body.company_name || !body.description) {
            return new Response(
                JSON.stringify({
                    error: "Données manquantes (nom, description)",
                }),
                { status: 400 }
            );
        }

        // Effectuer la requête PATCH vers l'API avec les nouvelles données
        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio.json",
            {
                method: "PATCH",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), // Envoie les nouvelles données dans le corps de la requête
            }
        );

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: "Erreur lors de la mise à jour du portfolio",
                }),
                { status: response.status }
            );
        }

        const updatedPortfolio = await response.json();
        return new Response(JSON.stringify(updatedPortfolio), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
