import { create } from "zustand";

const projects = [
    {
        id: 0,
        title: "MAISON KAYI",
        subtitle: "Luxury Furniture",
        catchphrase: "On Demand Luxury Furniture & Accessories",
        tags: ["Dev IA"],
        link: "/company/0",
        description:
            "We offer comprehensive digital solutions, including websites, mobile apps, and intelligent AI Agents that act as personal assistants, sales managers, product managers, and survey conductors.",
        image: "projects/maison-kayi/maison-kayi-0.jpeg",
        images: [
            "projects/maison-kayi/maison-kayi-0.jpeg",
            "projects/maison-kayi/maison-kayi-1.jpeg",
            "projects/maison-kayi/maison-kayi-2.jpeg",
            "projects/maison-kayi/maison-kayi-3.png",
            "projects/maison-kayi/maison-kayi-4.png",
            "projects/maison-kayi/maison-kayi-5.png",
        ],
        author: "OLENX",
        avatar: "logo/logo.png",
    },
    {
        id: 1,
        title: "Laetitia Armange",
        subtitle: "",
        catchphrase: "EQ & Entrepreneurship Coach",
        tags: ["Dev IA"],
        link: "/company/0",
        description:
            "An AI Powered App That Responds To The Prospects Deterlmining Their Needs And Guide Them To Book A Schedule.",
        image: "projects/laetitia-armange/laetitia-armange-0.png",
        images: [
            "projects/laetitia-armange/laetitia-armange-0.png",
            "projects/laetitia-armange/laetitia-armange-1.png",
        ],
        author: "OLENX",
    },
    {
        id: 2,
        title: "DEMO",
        subtitle: "",
        catchphrase: "Marketplace To Sell Luxury Multi Brand Products",
        tags: ["Dev IA"],
        link: "/company/0",
        description:
            "An AI Powered App That Responds To The Prospects Deterlmining Their Needs And Guide Them To Book A Schedule.",
        image: "projects/demo/demo-0.webp",
        images: ["projects/demo/demo-0.webp"],
        author: "OLENX",
        avatar: "logo/olenx-logo.jpeg",
    },
    {
        id: 3,
        title: "NapKnock",
        subtitle: "",
        catchphrase: "Marketplace To Sell Luxury Multi Brand Products",
        tags: ["Dev IA"],
        link: "/company/0",
        description:
            "An AI Powered App That Responds To The Prospects Deterlmining Their Needs And Guide Them To Book A Schedule.",
        image: "projects/napknock/napknock-0.webp",
        images: [
            "projects/napknock/napknock-0.webp",
            "projects/napknock/napknock-1.webp",
        ],
        author: "OLENX",
        avatar: "",
        avatar: "logo/olenx-logo.jpeg",
    },
    {
        id: 4,
        title: "Zooom",
        subtitle: "media mode",
        catchphrase: "La mode par (0°0)",
        tags: ["Design"],
        description: "Lorem20",
        image: "projects/zooom.png",
        images: [],
        link: "/portfolio/0",
        author: "Ibrahima BARRY",
    },
    {
        id: 5,
        title: "Moment",
        subtitle: "",
        catchphrase: "La mode par (0°0)",
        tags: ["Dev Web"],
        description: "Lorem20",
        image: "projects/moment.png",
        images: ["e"],
        link: "/portfolio/0",
        author: "Ibrahima BARRY",
    },
];

const projectsStore = create((set) => ({
    projects,
}));

export default projectsStore;
