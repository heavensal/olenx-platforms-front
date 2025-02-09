"use client";
import styles from "@/styles/container/profile.module.scss";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import { FaUserEdit } from "react-icons/fa";
import { MdOutlineQrCode2 } from "react-icons/md";
import Modal from "@/components/Modal";
import ProfileForm from "@/components/Modal/ProfileForm";

const Profile = ({ portfolio, user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <section className={styles.profile}>
            <div className={styles.profile__infos}>
                <div className={styles.profile__text}>
                    <h1 className={styles.profile__name}>
                        {portfolio?.company_name}
                    </h1>
                    <p className={styles.profile__catchphrase}>
                        {portfolio?.description}
                    </p>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={"Modifier mes informations "}
                    >
                        <ProfileForm
                            portfolio={portfolio}
                            onCancel={closeModal}
                        ></ProfileForm>
                    </Modal>
                </div>
                <div className={styles.edit}>
                    <div className={styles.edit__btns}>
                        {user?.id == portfolio?.user.id && (
                            <FaUserEdit size={30} onClick={openModal} />
                        )}
                    </div>
                    <div className={styles.edit__btns}>
                        <MdOutlineQrCode2 size={30} />
                    </div>
                </div>
                {/* <div className={styles.profile__code}>
                    {portfolio?.qr_code && (
                        <Image
                            src={portfolio.qr_code}
                            width={200}
                            height={200}
                            alt="QR Code"
                            priority
                        />
                    )}
                </div> */}
            </div>
        </section>
    );
};

export default Profile;
