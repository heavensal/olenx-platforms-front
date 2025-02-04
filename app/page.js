"use client";
import Card from "@/components/Card";
import projectsStore from "@/stores/projectsStores";
import styles from "@/styles/pages/home.module.scss";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function Home() {
    // const cards = cardStore((state) => state.cards);
    const { portfolios, loading, error, fetchPortfolios } = projectsStore();

    useEffect(() => {
        fetchPortfolios();
    }, [fetchPortfolios]);

    const options = ["Tous", "Design", "Dev Web", "Dev IA"];
    const [active, setActive] = useState("Tous");
    const handleClick = (option) => {
        setActive(option);
    };
    return (
        <main className={styles.home}>
            <div className={styles.home__banner}>
                <h1>
                    Collaborez, créez, innovez<br></br>{" "}
                    <span>OLENX Platforms</span>{" "}
                </h1>
                <p className={styles.home__banner__text}>
                    Connectez freelances et entreprises : découvrez des
                    portfolios inspirants, proposez des projets ambitieux, et
                    collaborez en toute simplicité sur une plateforme dédiée.
                </p>
            </div>
            <div className={styles.selections}>
                <div className={styles.searchbar}>
                    <IoSearchSharp size={30} />
                    <input type="text" placeholder="Rechercher..." />
                </div>
                <ul className={styles.home__filter}>
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleClick(option)}
                            className={`${styles.project__filter__item} ${
                                active === option ? "active" : ""
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </ul>
            </div>
            {/* <ul className={styles.users__list}>
                {projects.map((project) => (
                    <li key={project.id} className={styles.users__list__card}>
                        <Card card={project} />
                    </li>
                ))}
            </ul> */}
            <ul className={styles.users__list}>
                {portfolios.map((portfolio) => (
                    <li key={portfolio.id} className={styles.users__list__card}>
                        <Card card={portfolio} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
