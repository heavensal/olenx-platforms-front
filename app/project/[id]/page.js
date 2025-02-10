"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/project.module.scss";
import Card from "@/components/Card";
import Image from "next/image";
import projectStore from "@/stores/projectStore";
import Profile from "@/container/profile";

const ProjectPage = () => {
    const params = useParams();

    const { fetchProject, project } = projectStore();

    useEffect(() => {
        fetchProject(params.id);
    }, []);

    if (!project) return <p>Chargement</p>;

    return (
        <main className={styles.project}>
            <div className={styles.project__infos}>
                <h1 className={styles.project__title}>{project?.title}</h1>
                <div className={styles.project__owner}>
                    <p>{project.portfolio?.company_name}</p>
                </div>
            </div>
            <div className={styles.project__content}>
                <p>{project?.description}</p>
            </div>
        </main>
    );
};

export default ProjectPage;
