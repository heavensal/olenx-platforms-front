"use client";
import styles from "@/styles/pages/portfolio.module.scss";
import Image from "next/image";
import { useState, useEffect } from "react";
import userStore from "@/stores/userStore";
import Card from "@/components/Card";

const Projects = () => {
    useEffect(() => {
        fetchProjects();
    }, []);

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
    });

    const { createProject, projects, fetchProjects } = userStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProject(newProject);
        setNewProject({ title: "", description: "" });
    };

    return (
        <section className={styles.project}>
            <ul className={styles.project__list}>
                {projects
                    ?.sort((a, b) => a.id - b.id)
                    .map((project) => (
                        <li
                            className={styles.product__list__item}
                            key={project?.id}
                        >
                            <Card card={project} page={"me"} />
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Titre"
                    value={newProject.title}
                    onChange={(e) =>
                        setNewProject({ ...newProject, title: e.target.value })
                    }
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newProject.description}
                    onChange={(e) =>
                        setNewProject({
                            ...newProject,
                            description: e.target.value,
                        })
                    }
                />
                <button type="submit">Créer le projet</button>
            </form>
        </section>
    );
};

export default Projects;
