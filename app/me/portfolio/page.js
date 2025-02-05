"use client";
import styles from "@/styles/pages/portfolio.module.scss";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";
import Image from "next/image";
import Card from "@/components/Card";

export default function Portfolio() {
    const {
        user,
        portfolio,
        loading,
        error,
        fetchUser,
        updatePortfolio,
        createProject,
    } = userStore();
    console.log(user?.token);

    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        company_name: portfolio?.company_name || "",
        description: portfolio?.description || "",
    });
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        if (portfolio) {
            setFormData({
                company_name: portfolio.company_name,
                description: portfolio.description,
            });
        }
    }, [portfolio]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNewProjectChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updatePortfolio(formData);
            if (result.success) {
                setIsEditing(false);
            } else {
                console.error(
                    "Erreur lors de la mise à jour :",
                    result.message
                );
            }
        } catch (err) {
            console.error("Erreur lors de la mise à jour :", err);
        }
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
            <section className={styles.profile}>
                <div className={styles.profile__infos}>
                    <div className={styles.profile__text}>
                        {isEditing ? (
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    placeholder="Nom de l'entreprise"
                                    className={styles.input}
                                />
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className={styles.textarea}
                                />
                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                >
                                    Enregistrer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className={styles.cancelButton}
                                >
                                    Annuler
                                </button>
                            </form>
                        ) : (
                            <>
                                <h1 className={styles.profile__name}>
                                    {portfolio?.company_name ||
                                        "Nom de l'entreprise non disponible"}
                                </h1>
                                <p className={styles.profile__catchphrase}>
                                    {portfolio?.description ||
                                        "Aucune description fournie"}
                                </p>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className={styles.editButton}
                                >
                                    Modifier
                                </button>
                            </>
                        )}
                    </div>
                    <div className={styles.profile__code}>
                        {portfolio?.qr_code && (
                            <Image
                                src={portfolio.qr_code}
                                width={200}
                                height={200}
                                alt="QR Code"
                                priority
                            />
                        )}
                    </div>
                </div>
            </section>
            <section className={styles.project}>
                <ul className={styles.project__list}>
                    {portfolio?.projects.map((project) => (
                        <li
                            className={styles.product__list__item}
                            key={project.id}
                        >
                            <Card card={project} page={"me"} />
                        </li>
                    ))}
                    <li className={styles.product__list__item}>
                        <p onClick={() => setIsCreating(true)}>new shit</p>
                    </li>
                </ul>

                {isCreating && (
                    <form onSubmit={handleCreateProject}>
                        <input
                            type="text"
                            name="title"
                            placeholder="Nom du projet"
                            value={newProject.title}
                            onChange={handleNewProjectChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description du projet"
                            value={newProject.description}
                            onChange={handleNewProjectChange}
                        />
                        <button type="submit">Créer</button>
                        <button
                            type="button"
                            onClick={() => setIsCreating(false)}
                        >
                            Annuler
                        </button>
                    </form>
                )}
            </section>
        </main>
    );
}
