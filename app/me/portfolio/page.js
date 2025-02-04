"use client"; // Assurez-vous que ce composant est exécuté côté client
import styles from "@/styles/pages/portfolio.module.scss"; // Importez les styles
import userStore from "@/stores/userStore"; // Importez votre store
import { useEffect } from "react";
import Image from "next/image";

export default function Portfolio() {
    // Récupérez les états et fonctions du store
    const { user, portfolio, loading, error, fetchUser } = userStore();

    // Appelez fetchUser une seule fois au montage du composant
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div className={styles.profile__infos}>
                    <div className={styles.profile__text}>
                        <h1 className={styles.profile__name}>
                            {portfolio?.company_name}
                        </h1>
                        <p className={styles.profile__catchphrase}>
                            {portfolio?.description}
                        </p>
                    </div>
                    <div className={styles.profile__code}>
                        {portfolio.qr_code && (
                            <Image
                                src={portfolio?.qr_code}
                                width={200}
                                height={200}
                                alt="QR Code"
                            />
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
