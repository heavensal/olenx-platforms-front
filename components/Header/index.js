"use client";
import styles from "@/styles/components/header.module.scss";
import Link from "next/link";
import Image from "next/image";
import { HiMenuAlt3 } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import { IoIosContrast } from "react-icons/io";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { useEffect, useRef } from "react";
import userStore from "@/stores/userStore";

const Header = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const options = ["Tous", "Freelance", "Projet"];
    const detailsRef = useRef(null);
    const { user } = userStore();
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                detailsRef.current &&
                !detailsRef.current.contains(event.target)
            ) {
                detailsRef.current.removeAttribute("open"); // Ferme le détail
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <header className={styles.header}>
            <Link href={"/"}>
                <Image
                    className={styles.logo}
                    src={"/images/logo/logo-olenx.svg"}
                    width={40}
                    height={40}
                    alt="Logo"
                />
            </Link>
            {isMobile ? (
                <HiMenuAlt3 size={30} className="hi" />
            ) : (
                <nav className={styles.menu}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__list__item}>Services</li>
                    </ul>
                </nav>
            )}
            {!isMobile && (
                <div className={styles.cta__container}>
                    {/* <div className="dark">
                        <IoIosContrast size={30} />
                    </div> */}
                    <details className={styles.details} ref={detailsRef}>
                        <summary className={styles.details__summary}>
                            <AiOutlineUserSwitch size={30} />
                        </summary>
                        <ul className={styles.details__list}>
                            <li className={styles.details__list__item}>Tous</li>
                            <li className={styles.details__list__item}>
                                Freelance
                            </li>
                            <li className={styles.details__list__item}>
                                Startup
                            </li>
                        </ul>
                    </details>
                    {user ? (
                        <Link
                            id="cta__orange"
                            className={`cta cta__orange`}
                            href={"/me/portfolio"}
                        >
                            Mon portfolio
                        </Link>
                    ) : (
                        <Link
                            className={`${styles.menu__list__item} cta`}
                            href={"/inscription"}
                        >
                            Nous rejoindre
                        </Link>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
