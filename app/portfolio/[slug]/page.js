"use client";
import Card from "@/components/Card";
import userStore from "@/stores/userStore";
import styles from "@/styles/pages/portfolio.module.scss";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Portfolio() {
    const params = useParams();
    const slug = params.slug;
    const user = userStore((state) => state.users[slug]);
    const [active, setActive] = useState("Tous");

    const options = ["Tous", "Design", "Dev Web"];

    const handleClick = (option) => {
        setActive(option);
    };

    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div className={styles.profile__infos}>
                    <div className={styles.profile__text}>
                        <h1 className={styles.profile__name}>{user.name}</h1>
                        <h2 className={styles.profile__job}>
                            {user.jobs.map((job, index) => (
                                <p key={index}>{job}</p>
                            ))}
                        </h2>
                        <p className={styles.profile__catchphrase}>
                            {user.catchprase}
                        </p>
                    </div>
                    <div className={styles.profile__code}>QR Code</div>
                </div>
                <ul className={styles.profile__tags}>
                    {user.tags.map((tag, index) => (
                        <li key={index} className={styles.profile__tags__item}>
                            {tag}
                        </li>
                    ))}
                </ul>
            </section>
            <section className={styles.presentation}>
                <div className={styles.presentation__description}>
                    <h2>Description</h2>
                    <p className={styles.description__text}>
                        {user.description}
                    </p>
                </div>
                <div className={styles.presentation__logiciels}>
                    <h2>Logiciels/Technologie</h2>
                    <ul className={styles.presentation__logiciels__list}>
                        {user.skills.map((skill, index) => (
                            <li
                                key={index}
                                className={styles.presentation__logiciels__list}
                                __item
                            >
                                {skill.icon}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className={styles.banner}>
                <Image
                    src={`/images/${user.banner}`}
                    width={1200}
                    height={1000}
                    quality={90}
                    alt={user.banner}
                />
            </section>
            <section className={styles.project}>
                <ul className={styles.project__filter}>
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

                <ul className={styles.project__list}>
                    {user.projects.map((project) => (
                        <li
                            className={styles.product__list__item}
                            key={project.id}
                        >
                            <Card card={project} />
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
