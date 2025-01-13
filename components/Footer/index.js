"use client";
import styles from "@/styles/components/footer.module.scss";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__text}>
                <p className={styles.footer__paragraph}>
                    Vous avez un <strong>projet</strong> tête ?
                </p>
                <Link className={styles.footer__cta} href={"/"}>
                    Parlons-en <FaArrowRight />
                </Link>
            </div>
            <div className={styles.footer__links}>
                <p className={styles.footer__links__title}>Explore</p>
                <ul className={styles.footer__list}>
                    <li className={styles.footer__list__item}>Work</li>
                    <li className={styles.footer__list__item}>
                        Terms & Privacy
                    </li>
                    <li className={styles.footer__list__item}>
                        Terms & Privacy
                    </li>
                    <li className={styles.footer__list__item}>LinkedIn</li>
                    <li className={styles.footer__list__item}>Contact</li>
                    <li className={styles.footer__list__item}>Instagram</li>
                </ul>
            </div>
            <p className={styles.footer__signature}>©2024 OLENX</p>
        </footer>
    );
};

export default Footer;
