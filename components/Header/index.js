"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import styles from "@/styles/components/header.module.scss";
import { HiMenuAlt3, HiLogout } from "react-icons/hi";
import { useMediaQuery } from "react-responsive";
import Link from "next/link";
import Image from "next/image";
import userStore from "@/stores/userStore";

const Header = () => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const { user, logout } = userStore();
    const router = useRouter();
    const menuRef = useRef(null);
    const [show, setShow] = useState(false);

    // Pour gérer l'animation du menu
    const toggleHeader = (e) => {
        e.preventDefault();
        setShow(!show);
    };

    // Quand show est modifié, on anime le menu
    useEffect(() => {
        const tl = gsap.timeline();
        const menu = menuRef.current;

        if (show) {
            document.body.style.overflow = "hidden";
            tl.fromTo(
                menu,
                { xPercent: 100 },
                { xPercent: -150, duration: 0.4, ease: "power1.in" }
            );
        } else {
            document.body.style.overflow = "auto";
            tl.to(menu, { xPercent: 100, duration: 0.8, ease: "power1.out" });
        }
    }, [show]);

    // Fonction pour gérer la redirection après l'animation
    const handleNavigation = (link) => {
        // D'abord rediriger la page
        router.push(link);

        // Ensuite, attendre la fin de l'animation pour fermer le menu
        const tl = gsap.timeline();
        tl.to(menuRef.current, {
            xPercent: 100,
            duration: 0.8,
            ease: "power1.out",
        });
    };

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
                <>
                    <HiMenuAlt3
                        size={40}
                        className="hi"
                        onClick={toggleHeader}
                    />
                    <nav className={styles.menu} ref={menuRef}>
                        <ul className={styles.menu__list}>
                            <li className={styles.menu__list__item}>
                                <Link href={"/"}>Accueil</Link>
                            </li>
                            <li className={styles.menu__list__item}>
                                <Link
                                    href={"https://www.olenx.com"}
                                    target="__blank"
                                >
                                    Services
                                </Link>
                            </li>

                            {user ? (
                                <div className={styles.cta__container}>
                                    <button
                                        className={`cta cta__orange cta__logout__mobile`}
                                        onClick={logout}
                                    >
                                        <HiLogout size={30} />
                                    </button>
                                    <a
                                        onClick={() =>
                                            handleNavigation("/me/portfolio")
                                        }
                                        className="cta cta__orange"
                                    >
                                        Mon portfolio
                                    </a>
                                </div>
                            ) : (
                                <div className={styles.cta__container}>
                                    <Link className="cta" href={"/inscription"}>
                                        Nous rejoindre
                                    </Link>
                                </div>
                            )}
                        </ul>
                    </nav>
                </>
            ) : (
                <nav className={styles.menu__desktop}>
                    <ul className={styles.menu__list}>
                        <li className={styles.menu__list__item}>
                            <Link href={"/"}>Accueil</Link>
                        </li>
                        <li className={styles.menu__list__item}>
                            <Link
                                href={"https://www.olenx.com"}
                                target="__blank"
                            >
                                Services
                            </Link>
                        </li>
                    </ul>

                    {user ? (
                        <div className={styles.cta__container}>
                            <button
                                className={`cta cta__orange`}
                                onClick={logout}
                            >
                                <HiLogout />
                            </button>
                            <a
                                onClick={() =>
                                    handleNavigation("/me/portfolio")
                                }
                                className="cta cta__orange"
                            >
                                Mon portfolio
                            </a>
                        </div>
                    ) : (
                        <div className={styles.cta__container}>
                            <Link className="cta" href={"/inscription"}>
                                Nous rejoindre
                            </Link>
                        </div>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;
