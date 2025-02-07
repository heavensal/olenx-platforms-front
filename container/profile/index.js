"use client";
import styles from "@/styles/container/profile.module.scss";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import userStore from "@/stores/userStore";
import { FaEdit } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const Profile = ({ portfolio }) => {
    const dialogRef = useRef(null);
    const { updatePortfolio, fetchPortfolio } = userStore();

    const [formData, setFormData] = useState({
        company_name: portfolio?.company_name || "",
        description: portfolio?.description || "",
    });

    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal(); // Utilise showModal pour ouvrir le dialogue
        }
    };
    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close(); // Utilise close pour fermer le dialogue
        }
    };
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
    };

    return (
        <section className={styles.profile}>
            <div className={styles.profile__infos}>
                <div className={styles.profile__text}>
                    <h1 className={styles.profile__name}>
                        {portfolio?.company_name ||
                            "Nom de l'entreprise non disponible"}
                    </h1>
                    <p className={styles.profile__catchphrase}>
                        {portfolio?.description || "Aucune description fournie"}
                    </p>
                    <div className="">{console.log(portfolio?.avatar)}</div>

                    <dialog ref={dialogRef} className={styles.modal}>
                        <div className={styles.modal__content}>
                            <h3 className={styles.modal__title}>
                                Modifier mes informations
                                <MdClose size={30} onClick={closeDialog} />
                            </h3>
                            <form
                                onSubmit={handleSubmit}
                                className={styles.modal__form}
                            >
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
                                    <button
                                        type="submit"
                                        className={styles.modal__form__save}
                                    >
                                        Enregistrer
                                    </button>
                                    <p
                                        onClick={closeDialog}
                                        className={styles.modal__form__cancel}
                                    >
                                        Annuler
                                    </p>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
                <div className={styles.edit}>
                    <FaEdit size={30} onClick={openDialog} />
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
