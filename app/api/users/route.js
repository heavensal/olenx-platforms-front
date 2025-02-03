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
