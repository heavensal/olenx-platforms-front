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
            <Profile portfolio={portfolio && portfolio} page="portfolio" />
            <section className={styles.project}>
                <ul className={styles.project__list}>
                    {portfolio?.projects.map((project) => (
                        <li
                            className={styles.product__list__item}
                            key={project.id}
                        >
                            <Card card={project} page={""} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default PortfolioPage;
