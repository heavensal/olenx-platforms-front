import styles from "@/styles/components/card.module.scss";
import { useState } from "react";
import Image from "next/image";
import Modal from "../Modal";

const Card = ({ card }) => {
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
                <Image
                    src={`/images/${card.avatar}`}
                    width={500}
                    height={300}
                    quality={90}
                    alt={card.avatar}
                />
            </div>
            <div className={styles.card__text}>
                <h3 className={styles.card__title}>{card.description}</h3>
                <p className={styles.card__tag}>{card.company_name}</p>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal} project={card} />
        </div>
    );
};

export default Card;
