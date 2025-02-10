"use client";
import styles from "@/styles/pages/portfolio.module.scss";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/Card";
import Profile from "@/container/profile";
import Projects from "@/container/projects";
import Ideas from "@/container/ideas";
import { useRouter } from "next/navigation";

export default function Portfolio() {
    const { user, portfolio, loading, error, fetchUser, logout } = userStore();
    const [isRedirecting, setIsRedirecting] = useState(false); // État pour gérer la redirection
    const router = useRouter();

    // Vérification du token dans localStorage
    useEffect(() => {
        fetchUser();
    }, [router]);
    // if (!user) router.push("/connexion");
    if (loading) return <p>Chargement en cours...</p>;
    if (error) return <p>Erreur : {error}</p>;

    return (
        <main className={styles.portfolio}>
            <Profile portfolio={portfolio} user={user} />
            <Projects />
            <Ideas></Ideas>
        </main>
    );
}
