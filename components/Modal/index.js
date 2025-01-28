"use client";
import { useEffect } from "react";
import styles from "@/styles/components/modal.module.scss";
import { IoShareOutline, IoLinkOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

const Modal = ({ isOpen, onClose, project }) => {
    const handleContentClick = (e) => {
        e.stopPropagation(); // Empêche la propagation pour que le clic sur le contenu ne ferme pas la modal
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    if (!isOpen) return null;

    return createPortal(
        <section className={styles.modal__overlay}>
            <div className={styles.modal} onClick={handleContentClick}>
                <div className={styles.modal__header}>
                    <div className={styles.modal__profile}>
                        <div onClick={onClose}>
                            <FaArrowLeft color="white" />
                        </div>
                        <div className={styles.modal__profile__photo}>
                            <Image
                                src={`/images/${project.avatar}`}
                                width={50}
                                height={50}
                                quality={90}
                                alt={project.avatar}
                            />
                        </div>
                        <div className={styles.modal__profile__infos}>
                            <p className={styles.modal__project__name}>
                                {project.title}
                            </p>
                            <Link
                                href={project.link}
                                className={styles.modal__author}
                            >
                                {project.author}
                            </Link>
                        </div>
                    </div>
                    <ul className={styles.modal__project__actions}>
                        <li className={styles.modal__project__actions__item}>
                            <IoShareOutline color="white" size={18} />
                        </li>
                        {/* <li className={styles.modal__project__actions__item}>
                            <IoLinkOutline size={18} />
                        </li> */}
                    </ul>
                </div>
                <div className={styles.modal__content}>
                    {project.images.map((image, index) => (
                        <Image
                            key={index}
                            className={styles.modal__image}
                            src={`/images/${image}`}
                            width={500}
                            height={300}
                            quality={90}
                            alt={"e"}
                        />
                    ))}
                    <p>{project.author}</p>
                </div>
            </div>
        </section>,
        document.body // Ajoute le modal directement dans le body
    );
};

export default Modal;
