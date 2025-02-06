"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/portfolio.module.scss";
import Card from "@/components/Card";
import Image from "next/image";
import portfolioStore from "@/stores/portfolioStore";
import Profile from "@/container/profile";
const PortfolioPage = ({ id }) => {
    const params = useParams();

    const { fetchPortfolio, portfolio } = portfolioStore();

    useEffect(() => {
        fetchPortfolio(params.id);
    }, [id]);

    if (!portfolio) return <p>Chargement</p>;

    return (
        <main className={styles.portfolio}>
            {/* <section className={styles.profile}>
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
            </section> */}
            <Profile portfolio={portfolio} />
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
                </ul>
            </section>
        </main>
    );
};

export default PortfolioPage;
