"use client";
import styles from "@/styles/container/projects.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import userStore from "@/stores/userStore";
import Card from "@/components/Card";
import CreateIdeaForm from "@/components/Modal/createIdeaForm";
import Modal from "@/components/Modal";
import { FaPlusCircle } from "react-icons/fa";
const Ideas = () => {
    const { ideas, fetchIdeas } = userStore();
    useEffect(() => {
        fetchIdeas();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className={styles.project}>
            <h2 className={styles.project}>Idées</h2>
            <ul className={styles.project__list}>
                {ideas
                    ?.sort((a, b) => a.id - b.id)
                    .map((idea) => (
                        <li
                            className={styles.product__list__item}
                            key={idea?.id}
                        >
                            <Card card={idea} page={"me"} />
                        </li>
                    ))}
                <li className={styles.project__add} onClick={openModal}>
                    <h3>Ajoutez une nouvelle idée</h3>
                    <FaPlusCircle size={40} />
                </li>
            </ul>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Ajoutez une nouvelle idée"}
            >
                <CreateIdeaForm onCancel={closeModal}></CreateIdeaForm>
            </Modal>
        </section>
    );
};

export default Ideas;
