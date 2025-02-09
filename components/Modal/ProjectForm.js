"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/components/modal.module.scss";
import { MdClose } from "react-icons/md";
import userStore from "@/stores/userStore";

const ProjectForm = ({ project, onCancel }) => {
    const [updatedProject, setUpdatedProject] = useState({
        id: project?.id,
        title: project?.title,
        description: project?.description,
    });

    const { updateProject } = userStore();

    // Mettre à jour updatedProject quand la prop project change
    useEffect(() => {
        setUpdatedProject({
            id: project?.id,
            title: project?.title,
            description: project?.description,
        });
    }, [project]); // Déclenche lorsque `project` change

    const handleChange = (e) => {
        setUpdatedProject({
            ...updatedProject,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProject(project?.id, updatedProject);
        onCancel;
    };

    return (
        <form onSubmit={handleUpdate} className={styles.modal__form}>
            <input type="hidden" name="id" value={project?.id} />
            <input
                type="text"
                name="title"
                placeholder="Titre"
                value={updatedProject.title}
                onChange={handleChange}
                className={styles.modal__form__input}
            />
            <textarea
                name="description"
                placeholder="Description"
                value={updatedProject.description}
                onChange={handleChange}
                className={styles.modal__form__textarea}
            />
            <div className={styles.modal__form__btns}>
                <button type="submit" className={styles.modal__form__save}>
                    Mettre à jour
                </button>
                <p onClick={onCancel} className={styles.modal__form__cancel}>
                    Annuler
                </p>
            </div>
        </form>
    );
};

export default ProjectForm;
