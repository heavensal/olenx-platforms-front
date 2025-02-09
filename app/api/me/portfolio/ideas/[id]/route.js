export async function DELETE(req) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification requis" }),
                { status: 401 }
            );
        }

        // Récupérer l'ID de l'idée à partir de l'URL
        const url = new URL(req.url);
        const ideaId = url.pathname.split("/").pop();

        if (!ideaId) {
            return new Response(
                JSON.stringify({ error: "ID de l'idée requis" }),
                { status: 400 }
            );
        }

        // Envoyer la requête DELETE à l'API externe
        const apiUrl = `https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/ideas/${ideaId}`;
        const response = await fetch(apiUrl, {
            method: "DELETE",
            headers: {
                Authorization: authHeader,
            },
        });

        // Vérifier si la réponse de l'API est valide
        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({
                    error:
                        errorData.message ||
                        "Échec de la suppression du projet à l'API externe",
                }),
                { status: response.status }
            );
        }

        // Retourner une réponse réussie
        return new Response(
            JSON.stringify({ message: "Projet supprimé avec succès" }),
            { status: 200 } // OK
        );
    } catch (error) {
        console.error("Erreur interne du serveur :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 } // Internal Server Error
        );
    }
}

export async function PATCH(req) {
    try {
        const authHeader = req.headers.get("Authorization");

        if (!authHeader) {
            return new Response(
                JSON.stringify({ error: "Token d'authentification requis" }),
                { status: 401 }
            );
        }

        // Récupérer l'ID du projet à partir de l'URL
        const url = new URL(req.url);
        const ideaId = url.pathname.split("/").pop();

        if (!ideaId) {
            return new Response(
                JSON.stringify({ error: "ID du projet requis" }),
                { status: 400 }
            );
        }

        // Récupérer le corps de la requête
        const body = await req.json();

        if (!body || Object.keys(body).length === 0) {
            return new Response(
                JSON.stringify({
                    error: "Les données mises à jour sont requises",
                }),
                { status: 400 }
            );
        }

        // Envoyer la requête PATCH à l'API externe
        const apiUrl = `https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/ideas/${ideaId}`;
        const response = await fetch(apiUrl, {
            method: "PATCH",
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        // Vérifier si la réponse de l'API est valide
        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({
                    error:
                        errorData.message ||
                        "Échec de la mise à jour du projet à l'API externe",
                }),
                { status: response.status }
            );
        }

        // Récupérer les données de la réponse de l'API
        const data = await response.json();

        // Retourner une réponse réussie
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error("Erreur interne du serveur :", error);
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
