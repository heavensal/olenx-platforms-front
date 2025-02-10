import styles from "@/styles/components/card.module.scss";
import { useState } from "react";
import userStore from "@/stores/userStore";
import Image from "next/image";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/Modal/ProjectForm";
import IdeaForm from "@/components/Modal/IdeaForm";
import { CldImage } from "next-cloudinary";

const Card = ({ card, page, formType }) => {
    const { user, deleteProject, deleteIdea } = userStore();
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
            `Voulez-vous vraiment supprimer  ${
                formType == "ce project" ? "projet" : "cette idée"
            }  ?`
        );

        if (isConfirmed && formType == "project") {
            await deleteProject(card.id); // Ne supprime que si l'utilisateur confirme
        } else if (isConfirmed && formType == "idea") {
            await deleteIdea(card.id); // Ne supprime que si l'utilisateur confirme
        }
    };

    const handleDeleteIdea = async () => {
        const isConfirmed = window.confirm(
            "Voulez-vous vraiment supprimer cette idée ?"
        );
        if (isConfirmed) {
            await deleteIdea(card.id); // Ne supprime que si l'utilisateur confirme
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                {/* <CldImage
                    src={card?.avatar}
                    width={200}
                    height={200}
                    alt={card?.avatar}
                /> */}
                {user && page == "me" ? (
                    <div className={styles.edit__btns}>
                        <MdEdit size={30} onClick={openModal} />
                        <MdDeleteForever
                            size={30}
                            onClick={
                                formType == "project"
                                    ? handleDelete
                                    : handleDeleteIdea
                            }
                        />
                    </div>
                ) : (
                    <></>
                )}
            </div>
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={
                    formType == "project"
                        ? "Modifier mon projet"
                        : "Modifier mon idée"
                }
            >
                {formType == "project" ? (
                    <ProjectForm project={card} onCancel={closeModal} />
                ) : (
                    <IdeaForm idea={card} onCancel={closeModal} />
                )}
            </Modal>
            <div className={styles.card__text}>
                <h3 className={styles.card__title}>{card.title}</h3>
                <p className={styles.card__paragraph}>{card.description}</p>
            </div>
        </div>
    );
};

export default Card;
