export async function GET(req, { params }) {
    const { id } = params;
    console.log(id);

    if (!id) {
        return new Response(JSON.stringify({ error: "ID requis" }), {
            status: 400,
        });
    }

    const response = await fetch(
        `https://olenx-platforms-api.onrender.com/api/v1/projects/${id}.json`,
        {
            headers: {
                Authorization: "Bearer VOTRE_TOKEN", // Remplace par un vrai token si besoin
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    if (!response.ok) {
        return new Response(
            JSON.stringify({ error: "Erreur lors du chargement du portfolio" }),
            { status: response.status }
        );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}
