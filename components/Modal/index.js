"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/components/modal.module.scss";
import { MdClose, MdOutlineQrCode2 } from "react-icons/md";

const Modal = ({ isOpen, onClose, children, title }) => {
    const dialogRef = useRef(null);
    const modalContentRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
            document.body.style.overflow = "hidden";
        } else {
            dialogRef.current.close();
            document.body.style.overflow = "auto";
        }
    }, [isOpen]);

    return (
        <dialog ref={dialogRef} className={styles.modal}>
            <div ref={modalContentRef} className={styles.modal__content}>
                <h3 className={styles.modal__title}>
                    {title}
                    <MdClose
                        className={styles.modal__close}
                        size={30}
                        onClick={onClose}
                    />
                </h3>
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
