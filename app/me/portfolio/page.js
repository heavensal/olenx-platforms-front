"use client";
import styles from "@/styles/pages/portfolio.module.scss";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import Profile from "@/container/profile";
import Projects from "@/container/projects";

export default function Portfolio() {
    const { portfolio, loading, error, fetchUser, createProject } = userStore();

    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleNewProjectChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateProject = async (e) => {
        e.preventDefault();

        createProject(newProject);
        setIsCreating(false); // Ferme le formulaire après la création
        setNewProject({ title: "", description: "" });
    };

    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <main className={styles.portfolio}>
            <Profile portfolio={portfolio} />
            <Projects projects={portfolio?.projects} />
        </main>
    );
}
