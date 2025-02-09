import styles from "@/styles/components/card.module.scss";
import { useState } from "react";
import userStore from "@/stores/userStore";
import Image from "next/image";

const Card = ({ card, page }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedProject, setUpdatedProject] = useState({
        id: card.id,
        title: card.title,
        description: card.description,
    });

    const { user, deleteProject, updateProject } = userStore();

    const handleDelete = async () => {
        await deleteProject(card.id);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updateProject(card.id, updatedProject);
        setIsEditing(false); // Fermer le formulaire après la mise à jour
    };

    const handleChange = (e) => {
        setUpdatedProject({
            ...updatedProject,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.card}>
            <div className={styles.card__image}>
                {/* {card.avatar && (
                    <Image
                        src={card?.avatar}
                        alt={card.name}
                        width={200}
                        height={200}
                    />
                )} */}
            </div>
            <div className={styles.card__text}>
                {user && isEditing ? (
                    <form onSubmit={handleUpdate}>
                        <input type="hidden" name="id" value={card?.id} />
                        <input
                            type="text"
                            name="title"
                            placeholder="Titre"
                            value={updatedProject.title}
                            onChange={handleChange}
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={updatedProject.description}
                            onChange={handleChange}
                        />
                        <button type="submit">Mettre à jour</button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                        >
                            Annuler
                        </button>
                    </form>
                ) : (
                    <>
                        <h3 className={styles.card__title}>
                            {page === "me" ? card.title : card.description}
                        </h3>
                        <p className={styles.card__paragraph}>
                            {card.description}
                        </p>
                        {page === "me" && (
                            <div className={styles.btns}>
                                <button
                                    className={styles.btns__modify}
                                    onClick={() => setIsEditing(true)}
                                >
                                    Modifier
                                </button>
                                <button
                                    className={styles.btns__delete}
                                    onClick={handleDelete}
                                >
                                    Supprimer
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;
