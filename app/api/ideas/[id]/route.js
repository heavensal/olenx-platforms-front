export async function GET(req, { params }) {
    const { id } = await params;
    console.log(id);

    if (!id) {
        return new Response(JSON.stringify({ error: "ID requis" }), {
            status: 400,
        });
    }

    const response = await fetch(
        `https://olenx-platforms-api.onrender.com/api/v1/ideas/${id}.json`,
        {
            headers: {
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
