"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/idea.module.scss";
import Card from "@/components/Card";
import Image from "next/image";
import ideaStore from "@/stores/ideaStore";
import Profile from "@/container/profile";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const IdeaPage = () => {
    const params = useParams();

    const { fetchIdea, idea } = ideaStore();

    const description = `###### Et
Et nam deleniti. Reprehenderit voluptas quo. Qui dolorem ipsa.

veritatis  | numquam | molestias
---- | ---- | ----
sapiente | rerum | ut
beatae | eligendi | neque`;

    useEffect(() => {
        fetchIdea(params.id);
    }, [params.id]);

    console.log(idea);

    if (!idea) return <p>Chargement</p>;

    return (
        <main className={styles.idea}>
            <section className={styles.idea__text}>
                <h2 className={styles.idea__title}>{idea.title}</h2>
                <div className={styles.btns}>
                    <div className={styles.btns__like}>
                        <AiOutlineLike size={30} />
                        <p>{idea.reactions?.likes}</p>
                    </div>
                    <div className={styles.btns__dislike}>
                        <AiOutlineDislike size={30} />
                        <p>{idea.reactions?.dislikes}</p>
                    </div>
                </div>
            </section>
            <section className={styles.idea__content}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {description}
                </ReactMarkdown>
                ;
            </section>
        </main>
    );
};

export default IdeaPage;
