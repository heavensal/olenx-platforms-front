"use client";
import { useRouter } from "next/navigation";
import styles from "@/styles/pages/confirm.module.scss";
import Link from "next/link";

const ConfirmationSuccess = () => {
    const router = useRouter();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Confirmation réussie !</h1>
            <p style={styles.message}>
                Votre compte a été confirmé avec succès.
            </p>
            <div style={styles.buttonContainer}>
                <Link style={styles.button} href={"/connexion"}>
                    Se connecter
                </Link>
                <Link style={styles.button} href={"/"}>
                    Aller à l'accueil
                </Link>
            </div>
        </div>
    );
};

export default ConfirmationSuccess;
