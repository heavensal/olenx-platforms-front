export async function GET() {
    const response = await fetch(
        "https://olenx-platforms-api.onrender.com/api/v1/portfolios/",
        {
            headers: {
                Authorization: "Bearer VOTRE_TOKEN", // Ajoute un token si nécessaire
                "Content-Type": "application/json",
            },
            cache: "no-store", // Évite la mise en cache
        }
    );

    if (!response.ok) {
        return new Response(
            JSON.stringify({ error: "Erreur lors du chargement des données" }),
            {
                status: response.status,
            }
        );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
