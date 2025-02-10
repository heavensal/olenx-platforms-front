"use client";
import Card from "@/components/Card";
import allStore from "@/stores/allStores";
import styles from "@/styles/pages/home.module.scss";
import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link"; // Pour utiliser les liens dynamiques

export default function Home() {
    const {
        all,
        portfolios,
        projects,
        ideas,
        fetchPortfolios,
        fetchProjects,
        fetchIdeas,
    } = allStore();

    useEffect(() => {
        fetchPortfolios();
        fetchProjects();
        fetchIdeas();
    }, [fetchPortfolios, fetchProjects, fetchIdeas]);

    const options = ["Tout", "Portfolios", "Projets", "Idées"];
    const [active, setActive] = useState("Tout");

    const handleClick = (option) => {
        setActive(option);
        console.log("je clique");
    };

    // Filtrage des données en fonction de l'option active
    let dataToDisplay = [];
    if (active === "Portfolios") {
        dataToDisplay = portfolios;
    } else if (active === "Projets") {
        dataToDisplay = projects;
    } else if (active === "Idées") {
        dataToDisplay = ideas;
    } else {
        dataToDisplay = all; // "Tout"
    }

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
            <ul className={styles.users__list}>
                {dataToDisplay.length > 0 ? (
                    dataToDisplay.map((item) => {
                        // Dynamically generate the link based on the type of item
                        let link = "";
                        if (item.id.startsWith("portfolio-")) {
                            link = `/portfolios/${item.id.replace(
                                "portfolio-",
                                ""
                            )}`;
                        } else if (item.id.startsWith("project-")) {
                            link = `/project/${item.id.replace(
                                "project-",
                                ""
                            )}`;
                        } else if (item.id.startsWith("idea-")) {
                            link = `/idea/${item.id.replace("idea-", "")}`;
                        }

                        return (
                            <li
                                key={item.id}
                                className={styles.users__list__card}
                            >
                                <Link href={link}>
                                    <Card card={item} />
                                </Link>
                            </li>
                        );
                    })
                ) : (
                    <p>Aucune donnée disponible</p>
                )}
            </ul>
        </main>
    );
}
