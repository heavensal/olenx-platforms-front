"use client";
import styles from "@/styles/container/projects.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import userStore from "@/stores/userStore";
import Card from "@/components/Card";
import CreateProjectForm from "@/components/Modal/createProjectForm";
import Modal from "@/components/Modal";
import { FaPlusCircle } from "react-icons/fa";
import Link from "next/link";

const Projects = () => {
    useEffect(() => {
        fetchProjects();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const { projects, fetchProjects } = userStore();

    return (
        <section className={styles.project}>
            <h2 className={styles.project__title}>Projets</h2>
            <ul className={styles.project__list}>
                {projects
                    ?.sort((a, b) => a.id - b.id)
                    .map((project) => (
                        <li
                            className={styles.product__list__item}
                            key={project?.id}
                        >
                            <Link href={`/project/${project?.id}`}>
                                <Card card={project} page={"me"} />
                            </Link>
                        </li>
                    ))}
                <li className={styles.project__add} onClick={openModal}>
                    <h3>Créer un nouveau projet</h3>
                    <FaPlusCircle size={40} />
                </li>
            </ul>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Créer un nouveau projet"}
            >
                <CreateProjectForm onCancel={closeModal}></CreateProjectForm>
            </Modal>
        </section>
    );
};

export default Projects;
