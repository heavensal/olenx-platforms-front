"use client";
import styles from "@/styles/pages/portfolio.module.scss";
import Image from "next/image";
import { useState } from "react";
import userStore from "@/stores/userStore";

const Profile = ({ portfolio }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { updatePortfolio, fetchPortfolio } = userStore();
    const [formData, setFormData] = useState({
        company_name: portfolio?.company_name || "",
        description: portfolio?.description || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
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
    return (
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
                            <button type="submit" className={styles.saveButton}>
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
    );
};

export default Profile;
