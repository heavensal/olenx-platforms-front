"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/components/modal.module.scss";
import userStore from "@/stores/userStore";

const CreateIdeaForm = ({ onCancel }) => {
    const [newIdea, setNewIdea] = useState({
        title: "",
        description: "",
    });

    const { createIdea } = userStore();

    // Mettre à jour updatedIdea quand la prop Idea change

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewIdea((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createIdea(newIdea);
        setNewIdea({ title: "", description: "" });
        onCancel;
    };
    return (
        <form onSubmit={handleSubmit} className={styles.modal__form}>
            <input
                type="text"
                name="title"
                placeholder="Titre"
                value={newIdea.title}
                onChange={handleChange}
                className={styles.modal__form__input}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={newIdea.description}
                onChange={handleChange}
                className={styles.modal__form__textarea}
            />
            <button type="submit" className={styles.modal__form__create}>
                Créer le projet
            </button>
        </form>
    );
};

export default CreateIdeaForm;
