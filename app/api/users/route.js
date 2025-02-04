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

        if (!body.email && !body.password) {
            return new Response(
                JSON.stringify({ error: "Au moins un champ doit être fourni" }),
                { status: 400 }
            );
        }

        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/users",
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: body }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error:
                        data.message ||
                        "Échec de la mise à jour des informations",
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
