"use client";
import { useState } from "react";
import styles from "@/styles/components/modal.module.scss";
import userStore from "@/stores/userStore";
import ImageUploader from "@/components/Modal/ImageUploader";

const ProfileForm = ({ portfolio, onCancel }) => {
    const { avatar } = userStore();
    const [formData, setFormData] = useState({
        company_name: portfolio?.company_name || "",
        description: portfolio?.description || "",
        avatar: portfolio?.avatar || avatar,
    });

    const { updatePortfolio } = userStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = (url) => {
        setFormData((prev) => ({
            ...prev,
            avatar: url, // Mise à jour de 'avatar' avec l'URL téléchargée
        }));
        console.log(avatar, "je suis avatar");
    };
    console.log(avatar, "je suis avatar 2");
    const handleSubmit = async (e) => {
        e.preventDefault();
        await updatePortfolio(formData);
        onCancel();
    };

    return (
        <form className={styles.modal__form} onSubmit={handleSubmit}>
            <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Nom de l'entreprise"
                className={styles.modal__form__input}
            />

            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className={styles.modal__form__textarea}
            />

            {/* Champ d'upload d'image */}
            <ImageUploader onUpload={handleImageUpload} />

            <div className={styles.modal__form__btns}>
                <button type="submit" className={styles.modal__form__save}>
                    Enregistrer
                </button>
                <p onClick={onCancel} className={styles.modal__form__cancel}>
                    Annuler
                </p>
            </div>
        </form>
    );
};

export default ProfileForm;
