import { NextResponse } from "next/server";
export async function POST(req) {
    try {
        const body = await req.json();
        const token = req.headers.get("Authorization");

        const response = await fetch(
            `https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/projects/`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(body),
            }
        );

        const data = await response.json();
        return NextResponse.json(data, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { error: "Une erreur est survenue lors de la requête." },
            { status: 500 }
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
        // Récupérer le corps de la requête
        const body = await req.json();

        // Validation des données requises
        if (!body.id || !body.data) {
            return new Response(
                JSON.stringify({
                    error: "L'ID du projet et les données sont requis",
                }),
                { status: 400 } // Bad Request
            );
        }

        // Envoyer les données à l'API externe
        const apiUrl = `https://olenx-platforms-api.onrender.com/api/v1/me/portfolio/projects/${body.id}.json`;
        const response = await fetch(apiUrl, {
            method: "PATCH", // Utilisation de PATCH pour la mise à jour partielle
            headers: {
                Authorization: authHeader,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body.data),
        });

        // Vérifier si la réponse de l'API est valide
        if (!response.ok) {
            const errorData = await response.json(); // Essayer de récupérer le message d'erreur de l'API
            return new Response(
                JSON.stringify({
                    error:
                        errorData.message ||
                        "Échec de la mise à jour du projet à l'API externe",
                }),
                { status: response.status } // Retourner le statut de l'API externe
            );
        }

        // Récupérer les données de la réponse de l'API
        const data = await response.json();

        // Retourner une réponse réussie
        return new Response(JSON.stringify(data), { status: 200 }); // OK
    } catch (error) {
        console.error("Erreur interne du serveur :", error); // Log l'erreur pour le débogage
        return new Response(
            JSON.stringify({ error: "Erreur interne du serveur" }),
            { status: 500 } // Internal Server Error
        );
    }
}
