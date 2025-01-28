import { create } from "zustand";

const companies = [
    {
        id: 0,
        name: "OLENX",
        jobs: ["Développeur Web Front-End", "Graphiste", "Expert SEO"],
        catchphrase: "Sheesh",
        tags: ["IA", "Design", "Rédaction", "Marketing Digital"],
        description:
            "We offer comprehensive digital solutions, including websites, mobile apps, and intelligent AI Agents that act as personal assistants, sales managers, product managers, and survey conductors.",
        team: [
            {
                id: 0,
                name: "Ennasser Hann",
                avatar: "company/team/team-02.webp",
                job: "Business Developper",
            },
            {
                id: 1,
                name: "Adam Lamouri",
                avatar: "company/team/team-02.webp",
                job: "Développeur Back-End",
            },
            {
                id: 2,
                name: "Ibrahima BARRY",
                avatar: "company/team/team-03.png",
                job: "Développeur Front-End",
            },
        ],
        banner: "banner/olenx-banner.png",
        projects: [
            {
                id: 0,
                title: "MAISON KAYI",
                subtitle: "Luxury Furniture",
                catchphrase: "On Demand Luxury Furniture & Accessories",
                tags: ["Dev IA"],
                description:
                    "We offer comprehensive digital solutions, including websites, mobile apps, and intelligent AI Agents that act as personal assistants, sales managers, product managers, and survey conductors.",
                image: "projects/maison-kayi/maison-kayi-0.jpeg",
                images: ["e"],
                author: "OLENX",
            },
            {
                id: 1,
                title: "Laetitia Armange",
                subtitle: "",
                catchphrase: "EQ & Entrepreneurship Coach",
                tags: ["Dev IA"],
                description:
                    "An AI Powered App That Responds To The Prospects Deterlmining Their Needs And Guide Them To Book A Schedule.",
                image: "projects/laetitia-armange/laetitia-armange-0.png",
                images: ["e"],
                author: "OLENX",
            },
            {
                id: 2,
                title: "DEMO",
                subtitle: "",
                catchphrase: "Marketplace To Sell Luxury Multi Brand Products",
                tags: ["Dev IA"],
                description:
                    "An AI Powered App That Responds To The Prospects Deterlmining Their Needs And Guide Them To Book A Schedule.",
                image: "projects/demo/demo-0.webp",
                images: ["e"],
                author: "OLENX",
            },
            {
                id: 3,
                title: "NapKnock",
                subtitle: "",
                catchphrase: "Marketplace To Sell Luxury Multi Brand Products",
                tags: ["Dev IA"],
                description:
                    "An AI Powered App That Responds To The Prospects Deterlmining Their Needs And Guide Them To Book A Schedule.",
                image: "projects/napknock/napknock-0.webp",
                images: ["e"],
                author: "OLENX",
            },
        ],
    },
    {
        id: 1,
        name: "Ib BARRY",
        job: ["Développeur Web Front-End", "Graphiste", "Expert SEO"],
        tags: ["Développement Web", "Design", "Rédaction", "Marketing"],
        project: [
            {
                id: 0,
                title: "Zooom",
                subtitle: "media mode",
                catchphrase: "La mode par (0°0)",
                tags: ["Design"],
                description: "Lorem20",
                images: [],
            },
            {
                id: 1,
                title: "Moment",
                subtitle: "",
                catchphrase: "La mode par (0°0)",
                tags: ["Design"],
                description: "Lorem20",
                images: [],
            },
        ],
    },
];

const companyStore = create((set) => ({
    companies,
}));

export default companyStore;
