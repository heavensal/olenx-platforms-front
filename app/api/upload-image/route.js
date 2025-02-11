import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { imageUrl } = await req.json();

        if (!imageUrl) {
            return NextResponse.json(
                { error: "Aucune URL d'image fournie" },
                { status: 400 }
            );
        }

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/dmbigyamv/image/upload`;

        const formData = new FormData();
        formData.append("file", imageUrl);
        formData.append("upload_preset", "olenxplatforms");

        const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    error: "Erreur lors de l'upload sur Cloudinary",
                    details: data,
                },
                { status: response.status }
            );
        }

        return NextResponse.json({ url: data.secure_url }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Erreur serveur", details: error.message },
            { status: 500 }
        );
    }
}
