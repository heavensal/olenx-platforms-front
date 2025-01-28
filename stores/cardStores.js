import { create } from "zustand";

const cards = [
    {
        id: 0,
        image: "projects/moment.png",
        link: "/portfolio/0",
        title: "moment.",
        tags: "Creative",
    },
    {
        id: 1,
        image: "projects/zooom.png",
        link: "/portfolio/0",
        title: "Zooom",
        tags: "Design",
    },
    {
        id: 2,
        image: "projects/demo/demo-0.webp",
        link: "/company/0",
        title: "DEMO",
        tags: "Dev. IA",
    },
    {
        id: 3,
        image: "company/wiggly-finger.jpg",
        link: "/company/0",
        title: "Wiggly Finger",
        tags: "Creative",
    },
    {
        id: 4,
        image: "projects/laetitia-armange/laetitia-armange-0.png",
        link: "/company/0",
        title: "Laetitia Armange",
        tags: "Dev. IA",
    },
    {
        id: 5,
        image: "company/subsequent-sneeze.jpg",
        link: "/company/0",
        title: "Subsequent Sneeze",
        tags: "Design",
    },
    {
        id: 6,
        image: "company/color-current.png",
        link: "/company/0",
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
