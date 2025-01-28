"use client";
import { useState } from "react";
import formsStore from "@/stores/formStore";
import styles from "@/styles/pages/inscription.module.scss";

export default function Inscription() {
    const [formData, setFormData] = useState({
        userInfos: {
            firstName: "",
            lastName: "",
            email: "",
            telephone: "",
            society: "",
            SIRET: "",
            message: "",
        },
    });

    const formLabels = formsStore((state) => state.formLabels);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            userInfos: { ...prevData.userInfos, [name]: value },
        }));
        // Reset invalid fields when the user starts typing
        setInvalidFields((prev) => ({ ...prev, [name]: false }));
    };

    const validateForm = () => {
        const newInvalidFields = {};
        const { firstName, lastName, email } = formData.userInfos;

        // Vérification des champs requis
        if (!firstName) newInvalidFields.firstName = true;
        if (!lastName) newInvalidFields.lastName = true;

        // Vérification du format de l'email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailPattern.test(email)) newInvalidFields.email = true;

        // Retourne les champs invalides
        return newInvalidFields;
    };
    return (
        <section className={styles.inscription}>
            <h1 className={styles.inscription__title}>S'inscrire</h1>
            <form className={styles.form}>
                <div className={styles.input__container}>
                    {formLabels.map((label) => (
                        <div key={label.id} className={styles.input__label}>
                            <label htmlFor={label.name}>{label.infos}</label>
                            <input
                                id={label.name}
                                type={label.type}
                                name={label.name}
                                placeholder={label.placeholder}
                                value={formData.userInfos[label.name]}
                                onChange={handleChange}
                                required={label.required}
                            />
                        </div>
                    ))}

                    <p id={styles.formHelp}>(*) champs requis</p>
                    <div className={styles.btnContainer}>
                        <button type="submit" className={`cta`}>
                            Nous rejoindre
                        </button>
                    </div>
                </div>
            </form>
        </section>
    );
}
