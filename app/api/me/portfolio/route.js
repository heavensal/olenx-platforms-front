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

        // Récupérer les données envoyées dans la requête (formData)
        const formData = await req.formData(); // Utiliser formData au lieu de json()

        // Extraire les valeurs de formData
        const company_name = formData.get("company_name");
        const description = formData.get("description");
        const avatar = formData.get("avatar"); // Avatar (image)

        // Vérifie que les données nécessaires sont présentes
        if (!company_name || !description) {
            return new Response(
                JSON.stringify({
                    error: "Données manquantes (nom, description)",
                }),
                { status: 400 }
            );
        }

        // Préparer les données à envoyer
        const body = new FormData();
        body.append("company_name", company_name);
        body.append("description", description);

        // Ajouter l'avatar à FormData si disponible
        if (avatar) {
            body.append("avatar", avatar);
        }

        // Effectuer la requête PATCH vers l'API avec les nouvelles données
        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/api/v1/me/portfolio.json",
            {
                method: "PATCH",
                headers: {
                    Authorization: authHeader,
                    // Notez que pour "multipart/form-data", Content-Type est géré automatiquement par le navigateur
                },
                body, // Utilisation de FormData directement dans le corps de la requête
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
