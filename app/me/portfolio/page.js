"use client";
import styles from "@/styles/pages/portfolio.module.scss";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import Profile from "@/container/profile";
import Projects from "@/container/projects";

export default function Portfolio() {
    const { user, portfolio, loading, error, fetchUser } = userStore();
    useEffect(() => {
        fetchUser();
    }, []);
    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <main className={styles.portfolio}>
            <Profile portfolio={portfolio} user={user} />
            <Projects />
        </main>
    );
}
