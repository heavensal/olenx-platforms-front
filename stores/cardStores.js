import { create } from "zustand";

const cards = [
    {
        id: 0,
        image: "freezing-birthday.jpg",
        title: "Freezing Birthday",
        tag: "Creative",
    },
    {
        id: 1,
        image: "stream-shop.jpg",
        title: "Stream Shop",
        tag: "Design",
    },
    {
        id: 2,
        image: "random-risk.jpg",
        title: "Random Risk",
        tag: "Photo",
    },
    {
        id: 3,
        image: "share-spark.jpg",
        title: "Share Spark",
        tag: "Style",
    },
    {
        id: 4,
        image: "wiggly-finger.jpg",
        title: "Wiggly Finger",
        tag: "Creative",
    },
    {
        id: 5,
        image: "subsequent-sneeze.jpg",
        title: "Subsequent Sneeze",
        tag: "Design",
    },
    {
        id: 6,
        image: "color-current.png",
        title: "Color Current",
        tag: "Photo",
    },
    {
        id: 7,
        image: "justice-robot.jpg",
        title: "Justice Robot",
        tag: "Style",
    },
    {
        id: 8,
        image: "the-dark-side.jpg",
        title: "The Dark Side",
        tag: "Creative",
    },
];

const cardStore = create((set) => ({
    cards,
}));

export default cardStore;
