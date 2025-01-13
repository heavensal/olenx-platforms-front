"use client";
import Card from "@/components/Card";
import cardStore from "@/stores/cardStores";
import styles from "@/styles/pages/home.module.scss";

export default function Home() {
    const cards = cardStore((state) => state.cards);

    return (
        <main className={styles.home}>
            <ul className={styles.users__list}>
                {cards.map((card) => (
                    <li key={card.id} className={styles.users__list__card}>
                        <Card card={card} />
                    </li>
                ))}
            </ul>
        </main>
    );
}
