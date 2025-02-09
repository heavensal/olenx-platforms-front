"use client";
import { useState } from "react";
import styles from "@/styles/components/modal.module.scss";
import userStore from "@/stores/userStore";

const ProfileForm = ({ portfolio, onCancel }) => {
    const [formData, setFormData] = useState({
        company_name: portfolio?.company_name || "",
        description: portfolio?.description || "",
    });
    const { updatePortfolio } = userStore();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        await updatePortfolio(formData);
        onCancel;
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
