import { create } from "zustand";

const cards = [
    {
        id: 0,
        image: "company/freezing-birthday.jpg",
        title: "Freezing Birthday",
        tags: "Creative",
    },
    {
        id: 1,
        image: "company/stream-shop.jpg",
        title: "Stream Shop",
        tags: "Design",
    },
    {
        id: 2,
        image: "company/random-risk.jpg",
        title: "Random Risk",
        tag: "Photo",
    },
    {
        id: 3,
        image: "company/share-spark.jpg",
        title: "Share Spark",
        tags: "Style",
    },
    {
        id: 4,
        image: "company/wiggly-finger.jpg",
        title: "Wiggly Finger",
        tags: "Creative",
    },
    {
        id: 5,
        image: "company/subsequent-sneeze.jpg",
        title: "Subsequent Sneeze",
        tags: "Design",
    },
    {
        id: 6,
        image: "company/color-current.png",
        title: "Color Current",
        tags: "Photo",
    },
    {
        id: 7,
        image: "company/justice-robot.jpg",
        title: "Justice Robot",
        tags: "Style",
    },
    {
        id: 8,
        image: "company/the-dark-side.jpg",
        title: "The Dark Side",
        tags: "Creative",
    },
];

const cardStore = create((set) => ({
    cards,
}));

export default cardStore;
