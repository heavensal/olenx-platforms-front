"use client";
import styles from "@/styles/components/header.module.scss";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";

const Header = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    return (
        <header className={styles.header}>
            <div className={styles.logo}></div>
            {isMobile ? (
                <HiMenuAlt3 size={30} className="hi" />
            ) : (
                <nav className={styles.menu}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__list__item}>Services</li>
                        <li className={styles.menu__list__item}>Projet</li>
                        <li className={styles.menu__list__item}>Freelance</li>
                    </ul>
                </nav>
            )}
            {!isMobile && (
                <div className={styles.cta__container}>
                    <Link
                        className={`${styles.menu__list__item} cta`}
                        href={"/"}
                    >
                        S'inscrire
                    </Link>
                    <Link
                        className={`${styles.menu__list__item} cta `}
                        href={"/"}
                    >
                        Se connecter
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
