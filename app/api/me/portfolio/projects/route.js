export async function GET(req) {
    try {
        // Vérifier si l'authentification est fournie
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification manquant" }),
                { status: 401 }
            );
        }

        // Effectuer la requête GET vers l'API externe
        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/projects",
            {
                method: "GET",
                headers: {
                    Authorization: authHeader, // Ajoute le token
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        // Vérifier si le serveur renvoie une réponse vide
        const responseText = await response.text();

        const data = responseText ? JSON.parse(responseText) : null;

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error:
                        data?.message ||
                        "Erreur lors de la récupération des projets",
                }),
                { status: response.status }
            );
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Erreur serveur :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        const body = await req.json();

        // Vérifier si l'authentification est fournie
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification manquant" }),
                { status: 401 }
            );
        }

        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/projects",
            {
                method: "POST",
                headers: {
                    Authorization: authHeader, // Ajoute le token
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body), // Envoi des données
                cache: "no-store",
            }
        );

        // Vérifier si le serveur renvoie une réponse vide
        const responseText = await response.text();

        const data = responseText ? JSON.parse(responseText) : null;

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error:
                        data?.message || "Erreur lors de la création du projet",
                }),
                { status: response.status }
            );
        }

        return new Response(JSON.stringify(data), { status: 201 });
    } catch (error) {
        console.error("Erreur serveur :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
