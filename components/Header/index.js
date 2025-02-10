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
    const { user } = userStore();
    useEffect(() => {}, []);
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
                <details className={styles.details}>
                    <summary className={styles.details__summary}>
                        <HiMenuAlt3 size={40} className="hi" />
                    </summary>
                    <nav className={styles.menu}>
                        <ul className={styles.menu__list}>
                            <li className={styles.menu__list__item}>
                                <Link href={"/"}>Accueil</Link>
                            </li>
                            <li className={styles.menu__list__item}>
                                {" "}
                                <Link
                                    href={"https://www.olenx.com"}
                                    target="__blank"
                                >
                                    Services
                                </Link>
                            </li>
                            <div className={styles.cta__container}>
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
                        </ul>
                    </nav>
                </details>
            ) : (
                <nav className={styles.menu}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__list__item}>
                            <Link href={"/"}>Accueil</Link>
                        </li>
                        <li className={styles.menu__list__item}>
                            {" "}
                            <Link
                                href={"https://www.olenx.com"}
                                target="__blank"
                            >
                                Services
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.cta__container}>
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
                </nav>
            )}
        </header>
    );
};

export default Header;
