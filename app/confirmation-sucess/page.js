import styles from "@/styles/pages/confirm.module.scss";
import Link from "next/link";

const ConfirmationSuccess = () => {
    return (
        <main className={styles.confirm}>
            <h1 className={styles.title}>Confirmation réussie !</h1>
            <p className={styles.message}>
                Votre compte a été confirmé avec succès.
            </p>
            <div className={styles.buttonContainer}>
                <Link className={styles.button} href={"/connexion"}>
                    Se connecter
                </Link>
                <Link className={styles.button} href={"/"}>
                    Aller à l'accueil
                </Link>
            </div>
        </main>
    );
};

export default ConfirmationSuccess;
