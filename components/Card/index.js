import styles from "@/styles/components/card.module.scss";
import Image from "next/image";

const Card = ({ card }) => {
    return (
        <div className={styles.card}>
            <Image
                className={styles.card__image}
                src={`/images/company/${card.image}`}
                width={500}
                height={260}
                quality={90} // Assure une bonne qualité
                alt={card.title}
            />
            <div className={styles.card__text}>
                <h3 className={styles.card__title}>{card.title}</h3>
                <p className={styles.card__tag}>{card.tag}</p>
            </div>
        </div>
    );
};

export default Card;
