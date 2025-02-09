"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/components/modal.module.scss";
import { MdClose } from "react-icons/md";
import userStore from "@/stores/userStore";

const IdeaForm = ({ idea, onCancel }) => {
    const [updatedIdea, setUpdatedIdea] = useState({
        id: idea?.id,
        title: idea?.title,
        description: idea?.description,
    });

    const { updateIdea } = userStore();

    // Mettre à jour updatedIdea quand la prop idea change
    useEffect(() => {
        setUpdatedIdea({
            id: idea?.id,
            title: idea?.title,
            description: idea?.description,
        });
    }, [idea]); // Déclenche lorsque `idea` change

    const handleChange = (e) => {
        setUpdatedIdea({
            ...updatedIdea,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateIdea(idea?.id, updatedIdea);
        onCancel;
    };

    return (
        <form onSubmit={handleUpdate} className={styles.modal__form}>
            <input type="hidden" name="id" value={idea?.id} />
            <input
                type="text"
                name="title"
                placeholder="Titre"
                value={updatedIdea.title}
                onChange={handleChange}
                className={styles.modal__form__input}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={updatedIdea.description}
                onChange={handleChange}
                className={styles.modal__form__textarea}
            />
            <div className={styles.modal__form__btns}>
                <button
                    type="submit"
                    className={styles.modal__form__save}
                    onClick={onCancel}
                >
                    Mettre à jour
                </button>
                <p onClick={onCancel} className={styles.modal__form__cancel}>
                    Annuler
                </p>
            </div>
        </form>
    );
};

export default IdeaForm;
