export async function GET(req) {
    try {
        // Récupérer le token depuis les headers de la requête
        const authHeader = req.headers.get("Authorization");
        console.log("auth", authHeader);

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
