import styles from "@/styles/components/card.module.scss";
import Image from "next/image";

const Card = ({ card }) => {
    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                <Image
                    src={`/images/${card.image}`}
                    width={500}
                    height={300}
                    quality={90}
                    alt={card.title}
                />
            </div>
            <div className={styles.card__text}>
                <h3 className={styles.card__title}>{card.title}</h3>
                <p className={styles.card__tag}>{card.tags}</p>
            </div>
        </div>
    );
};

export default Card;
