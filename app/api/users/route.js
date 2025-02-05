export async function POST(req) {
    try {
        const body = await req.json();

        if (!body.email || !body.password || !body.password_confirmation) {
            return new Response(
                JSON.stringify({ error: "Tous les champs sont requis" }),
                { status: 400 }
            );
        }

        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/users",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: body }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: data.message || "Échec de l'inscription",
                }),
                { status: response.status }
            );
        }

        return new Response(JSON.stringify(data), { status: 201 });
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

        console.log(
            "Corps de la requête :",
            JSON.stringify(requestBody, null, 2)
        );

        // Envoi de la requête PATCH à l'API externe
        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/users",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            }
        );

        // Vérifie si la réponse est valide
        console.log("Réponse brute :", response);

        if (!response.ok) {
            const text = await response.text(); // Lire la réponse comme texte brut
            console.error("Erreur de l'API externe :", text);
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        // Parser la réponse en JSON uniquement si elle est valide
        const data = await response.json();
        console.log("Réponse JSON :", data);

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

export async function DELETE(req) {
    try {
        const body = await req.json();

        if (!body.userId) {
            return new Response(
                JSON.stringify({ error: "L'ID de l'utilisateur est requis" }),
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://olenx-platforms-api.onrender.com/users/${body.userId}`,
            {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (!response.ok) {
            const data = await response.json();
            return new Response(
                JSON.stringify({
                    error: data.message || "Échec de la suppression du compte",
                }),
                { status: response.status }
            );
        }

        return new Response(
            JSON.stringify({ message: "Compte supprimé avec succès" }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
