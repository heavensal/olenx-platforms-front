"use client";
import { useSearchParams } from "next/navigation";

const ConfirmationPage = () => {
    const searchParams = useSearchParams();
    const confirmation_token = searchParams.get("confirmation_token");
    const [message, setMessage] = useState("Confirmation en cours...");

    useEffect(() => {
        if (confirmation_token) {
            fetch(
                `https://olenx-platforms-api.onrender.com/users/confirmation?confirmation_token=${confirmation_token}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Erreur lors de la confirmation.");
                    }
                    return response.json();
                })
                .then((data) => {
                    setMessage(data.message || "Confirmation réussie !");
                })
                .catch((error) => {
                    console.error("Erreur :", error);
                    setMessage("Échec de la confirmation. Veuillez réessayer.");
                });
        }
    }, [confirmation_token]);

    return (
        <div>
            <h1>Confirmation d'utilisateur</h1>
            <p>{message}</p>
        </div>
    );
};

export default ConfirmationPage;
