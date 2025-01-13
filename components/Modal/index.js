"use client";
import { useEffect } from "react";
import styles from "@/styles/components/modal.module.scss";
import { IoShareOutline } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";

const Modal = ({ isOpen, onClose, project }) => {
    console.log(project, "e");

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
            <div className={styles.modal}>
                <div className={styles.modal__header}>
                    <div className={styles.modal__profile}>
                        <Link href={"#"} onClick={onClose}>
                            <FaArrowLeft color="white" />
                        </Link>
                        <div className={styles.modal__profile__photo}></div>
                        <div className={styles.modal__profile__infos}>
                            <p className={styles.modal__project__name}>es</p>
                            <p>Créateur</p>
                        </div>
                    </div>
                    <ul className={styles.modal__project__actions}>
                        <li className={styles.modal__project__actions__item}>
                            <IoShareOutline color="white" size={15} />
                        </li>
                        <li className={styles.modal__project__actions__item}>
                            <IoShareOutline color="white" size={15} />
                        </li>
                    </ul>
                </div>
                <div className={styles.modal__content}>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Ipsa sequi mollitia numquam.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                    <Image
                        src={`/images/`}
                        width={1200}
                        height={1000}
                        quality={90}
                        alt={"alt"}
                    />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Saepe, laudantium? Nobis illum optio fugiat, sit
                        impedit neque praesentium commodi suscipit earum
                        molestias ducimus corporis dolore ex magnam mollitia
                        facilis molestiae.
                    </p>
                </div>
            </div>
        </section>,
        document.body // Ajoute le modal directement dans le body
    );
};

export default Modal;
