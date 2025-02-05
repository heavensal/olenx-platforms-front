"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/portfolio.module.scss";
import Card from "@/components/Card";
import Image from "next/image";
const PortfolioPage = ({ id }) => {
    const params = useParams();

    const [portfolio, setPortfolio] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await fetch(`/api/portfolios/${params.id}`);
                if (!response.ok) {
                    throw new Error("Erreur lors du chargement du portfolio");
                }
                const data = await response.json();
                console.log(data.portfolio);

                setPortfolio(data.portfolio);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolio();
    }, [id]);

    if (loading) return <p>Chargement...</p>;

    if (error) return <p style={{ color: "red" }}>Erreur: {error}</p>;

    if (!portfolio) return <p>Aucun portfolio trouvé</p>;

    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div className={styles.profile__infos}>
                    <div className={styles.profile__text}>
                        <h1 className={styles.profile__name}>
                            {portfolio?.company_name ||
                                "Nom de l'entreprise non disponible"}
                        </h1>
                        <p className={styles.profile__catchphrase}>
                            {portfolio?.description ||
                                "Aucune description fournie"}
                        </p>
                    </div>
                    <div className={styles.profile__code}>
                        {portfolio?.qr_code && (
                            <Image
                                src={portfolio.qr_code}
                                width={200}
                                height={200}
                                alt="QR Code"
                                priority
                            />
                        )}
                    </div>
                </div>
            </section>
            <section className={styles.project}>
                <ul className={styles.project__list}>
                    {portfolio?.projects.map((project) => (
                        <li
                            className={styles.product__list__item}
                            key={project.id}
                        >
                            <Card card={project} page={"me"} />
                        </li>
                    ))}
                    <li className={styles.product__list__item}>
                        <p onClick={() => setIsCreating(true)}>new shit</p>
                    </li>
                </ul>
            </section>
        </main>
    );
};

export default PortfolioPage;
