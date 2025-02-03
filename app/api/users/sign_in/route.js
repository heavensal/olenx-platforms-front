export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return new Response(
                JSON.stringify({ error: "Email et mot de passe requis" }),
                { status: 400 }
            );
        }

        const response = await fetch(
            "https://olenx-platforms-api.onrender.com/users/sign_in",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: { email, password },
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return new Response(
                JSON.stringify({
                    error: errorData.message || "Échec de la connexion bg",
                }),
                { status: response.status }
            );
        }

        // Récupérer le token depuis les en-têtes
        const token = response.headers.get("Authorization");
        if (!token) {
            return new Response(
                JSON.stringify({ error: "Token non reçu dans la réponse" }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ token }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 }
        );
    }
}
