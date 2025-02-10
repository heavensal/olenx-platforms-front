"use client";
import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
    const searchParams = useSearchParams();
    const confirmation_token = searchParams.get("confirmation_token");

    console.log("Token de confirmation :", confirmation_token);

    if (!confirmation_token) {
        return <p>Chargement...</p>;
    }

    return (
        <div>
            <h1>Confirmation d'utilisateur</h1>
            <p>Votre token de confirmation : {confirmation_token}</p>
        </div>
    );
};

export default ConfirmationPage;
