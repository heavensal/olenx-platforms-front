import styles from "@/styles/components/card.module.scss";
import { useState } from "react";
import userStore from "@/stores/userStore";
import Image from "next/image";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/Modal/ProjectForm";

const Card = ({ card, page }) => {
    const { user, deleteProject } = userStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!card) return null;

    const handleDelete = async () => {
        const isConfirmed = window.confirm(
            "Voulez-vous vraiment supprimer ce projet ?"
        );
        if (isConfirmed) {
            await deleteProject(card.id); // Ne supprime que si l'utilisateur confirme
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                {user && page == "me" ? (
                    <div className={styles.edit__btns}>
                        <MdEdit size={30} onClick={openModal} />
                        <MdDeleteForever size={30} onClick={handleDelete} />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={"Modifier mon projet"}
            >
                <ProjectForm project={card} onCancel={closeModal} />
            </Modal>
            <div className={styles.card__text}>
                <h3 className={styles.card__title}>{card.title}</h3>
                <p className={styles.card__paragraph}>{card.description}</p>
            </div>
        </div>
    );
};

export default Card;
