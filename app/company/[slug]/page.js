"use client";
import Card from "@/components/Card";
import styles from "@/styles/pages/portfolio.module.scss";
import { useParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Modal from "@/components/Modal";
import companyStore from "@/stores/companyStore";

export default function Company() {
    const params = useParams();
    const slug = params.slug;
    const company = companyStore((state) => state.companies[slug]);
    console.log(company);

    const [active, setActive] = useState("Tous");
    const [selectedProject, setSelectedProject] = useState("");
    const project = company.projects.filter(
        (project) => project.id == selectedProject
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const options = ["Tous", "Design", "Dev Web", "Dev IA"];

    const handleClick = (option) => {
        setActive(option);
    };

    const openModal = (project) => {
        setIsModalOpen(true);
        setSelectedProject(project);
    };
    const closeModal = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <main className={styles.portfolio}>
            <section className={styles.profile}>
                <div className={styles.profile__infos}>
                    <div className={styles.profile__text}>
                        <h1 className={styles.profile__name}>{company.name}</h1>
                        <ul className={styles.profile__job}>
                            {company.jobs.map((job, index) => (
                                <li
                                    key={index}
                                    className={styles.profile__job__item}
                                >
                                    {job}
                                </li>
                            ))}
                        </ul>
                        <p className={styles.profile__catchphrase}>
                            {company.catchprase}
                        </p>
                    </div>
                    <div className={styles.profile__code}>QR Code</div>
                </div>
                <ul className={styles.profile__tags}>
                    {company.tags.map((tag, index) => (
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
                        {company.description}
                    </p>
                </div>
                <div className={styles.presentation__logiciels}>
                    <h2>L'équipe</h2>
                    <ul className={styles.presentation__logiciels__list}>
                        {company.team.map((person, index) => (
                            <li
                                key={index}
                                className={styles.presentation__logiciels__list}
                                __item
                            >
                                <div className={styles.test__image}>
                                    <Image
                                        src={`/images/${person.avatar}`}
                                        width={500}
                                        height={500}
                                        quality={90}
                                        alt={person.image}
                                    />
                                </div>
                                {person.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
            <section className={styles.banner}>
                <Image
                    src={`/images/${company.banner}`}
                    width={1200}
                    height={1000}
                    quality={90}
                    alt={company.banner}
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
                    {company.projects
                        .filter(
                            (project) =>
                                active === "Tous" || project.tags[0] === active
                        )
                        .map((project) => (
                            <li
                                className={styles.product__list__item}
                                key={project.id}
                                onClick={() => openModal(project.id)}
                            >
                                <Card card={project} />
                            </li>
                        ))}
                </ul>
            </section>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                project={project}
            />
        </main>
    );
}
