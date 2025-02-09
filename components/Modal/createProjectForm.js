"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/components/modal.module.scss";
import userStore from "@/stores/userStore";

const CreateProjectForm = ({ onCancel }) => {
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
    });

    const { createProject } = userStore();

    // Mettre à jour updatedProject quand la prop project change

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProject(newProject);
        setNewProject({ title: "", description: "" });
        onCancel;
    };
    return (
        <form onSubmit={handleSubmit} className={styles.modal__form}>
            <input
                type="text"
                name="title"
                placeholder="Titre"
                value={newProject.title}
                onChange={handleChange}
                className={styles.modal__form__input}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={newProject.description}
                onChange={handleChange}
                className={styles.modal__form__textarea}
            />
            <button type="submit" className={styles.modal__form__create}>
                Créer le projet
            </button>
        </form>
    );
};

export default CreateProjectForm;
