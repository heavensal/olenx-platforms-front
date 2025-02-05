export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Données envoyées :", body);

        // Vérifier si l'authentification est fournie
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification manquant" }),
                { status: 401 }
            );
        }

        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/projects.json",
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

        const data = await response.json();

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error:
                        data.message || "Erreur lors de la création du projet",
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
