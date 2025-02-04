import styles from "@/styles/components/card.module.scss";
import { useState } from "react";
import Image from "next/image";
import Modal from "../Modal";

const Card = ({ card, page }) => {
    console.log(card);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = (e) => {
        e.preventDefault();
        setIsModalOpen(false);
    };

    return (
        <div className={styles.card} onClick={() => openModal()}>
            <div className={styles.card__image}>
                {/* {card?.avatar && (
                    <Image
                        src={card.avatar}
                        alt={card.name}
                        width={200}
                        height={200}
                    />
                )} */}
            </div>
            <div className={styles.card__text}>
                <h3 className={styles.card__title}>
                    {page == "me" ? card.title : card.description}
                </h3>
                <p className={styles.card__tag}>{card.description}</p>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} project={card} />
        </div>
    );
};

export default Card;
