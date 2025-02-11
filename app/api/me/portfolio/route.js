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

        // Lire le body de la requête
        const body = await req.json();

        // Vérifier que les données nécessaires sont présentes
        if (!body.company_name || !body.description) {
            return new Response(
                JSON.stringify({ error: "Données incomplètes" }),
                { status: 400 }
            );
        }

        // Effectuer la requête PATCH vers ton API externe
        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio.json",
            {
                method: "PATCH",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    company_name: body.company_name,
                    description: body.description,
                    avatar: body.avatar,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error:
                        data.error ||
                        "Erreur lors de la mise à jour du portfolio",
                }),
                { status: response.status }
            );
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
