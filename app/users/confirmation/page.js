// /app/users/confirmation/page.js
"use client";
import { useRouter } from "next/navigation";

const ConfirmationPage = () => {
    const router = useRouter();
    const { confirmation_token } = router.query;
    console.log(router.query, "je suis grooot");

    // Logique de confirmation avec confirmation_token
    if (!confirmation_token) {
        return <p>Chargement...</p>; // Affiche un message de chargement en attendant le token
    }

    return (
        <div>
            <h1>Confirmation d'utilisateur</h1>
            <p>Votre token de confirmation : {confirmation_token}</p>
            {/* Ajoutez ici le traitement de la confirmation */}
        </div>
    );
};

export default ConfirmationPage;
