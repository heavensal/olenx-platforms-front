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
        const body = await req.json();
        const authHeader = req.headers.get("Authorization");
        // Validation des champs
        if (!body.portfolio?.company_name && !body.portfolio?.description) {
            return new Response(
                JSON.stringify({ error: "Au moins un champ doit être fourni" }),
                { status: 400 }
            );
        }

        // Corps de la requête
        const requestBody = {
            portfolio: {
                company_name: body.portfolio.company_name,
                description: body.portfolio.description,
            },
        };

        // Envoi de la requête PATCH à l'API externe
        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio",
            {
                method: "PATCH",
                headers: {
                    Authorization: authHeader,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            }
        );

        // Vérifie si la réponse est valide

        if (!response.ok) {
            const text = await response.text(); // Lire la réponse comme texte brut
            console.error("Erreur de l'API externe :", text);
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Parser la réponse en JSON uniquement si elle est valide
        const data = await response.json();

        // Réponse en cas de succès
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Gestion des erreurs internes
        console.error("Erreur lors de la requête PATCH:", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
