"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Suspense } from "react";

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const confirmation_token = searchParams.get("confirmation_token");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (confirmation_token) {
            const confirmUser = async () => {
                try {
                    const response = await fetch(
                        `https://olenx-platforms-api.onrender.com/users/confirmation?confirmation_token=${confirmation_token}`,
                        { method: "GET" }
                    );

                    if (!response.ok) {
                        throw new Error("La confirmation a échoué");
                    }

                    // Si la confirmation réussit, vous pouvez rediriger l'utilisateur ou afficher un message de succès
                    router.push("/confirmation-success");
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            confirmUser();
        }
    }, [confirmation_token, router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Confirmation Page</h1>
            <p>Token: {confirmation_token}</p>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
