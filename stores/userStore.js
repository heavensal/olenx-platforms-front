import { create } from "zustand";
import {
    SiAdobephotoshop,
    SiAdobeillustrator,
    SiWordpress,
} from "react-icons/si";
import { RiNextjsFill, RiNodejsFill } from "react-icons/ri";

const users = [
    {
        id: 0,
        name: "Ibrahima BARRY",
        jobs: ["Développeur Web Front-End", "Graphiste", "Expert SEO"],
        catchphrase: "Sheesh",
        tags: ["Développement Web", "Design", "Rédaction", "Marketing"],
        description:
            "Développeur web passionné avec une expertise en front-end, notamment avec Next.js. Solides bases en back-end avec Node.js, et expérience approfondie avec les CMS tels que Shopify & Wordpress. Appréciant découvrir des cultures, je suis ouvert à des opportuinités de collaboration en international, en télétravail ou sur site",
        skills: [
            {
                id: 0,
                name: "Photoshop",
                icon: <SiAdobephotoshop size={30} />,
            },
            {
                id: 1,
                name: "Illustrator",
                icon: <SiAdobeillustrator size={30} />,
            },
            {
                id: 2,
                name: "Next.js",
                icon: <RiNextjsFill size={30} />,
            },
            {
                id: 3,
                name: "Wordpress",
                icon: <SiWordpress size={30} />,
            },
            {
                id: 4,
                name: "Node.js",
                icon: <RiNodejsFill size={30} />,
            },
        ],
        banner: "banner/ibra-banner.jpeg",
        projects: [
            {
                id: 0,
                title: "Zooom",
                subtitle: "media mode",
                catchphrase: "La mode par (0°0)",
                tags: ["Design"],
                description: "Lorem20",
                image: "projects/zooom.png",
                images: ["e"],
                author: "Ibrahima BARRY",
            },
            {
                id: 1,
                title: "Moment",
                subtitle: "",
                catchphrase: "La mode par (0°0)",
                tags: ["Dev Web"],
                description: "Lorem20",
                image: "projects/moment.png",
                images: ["e"],
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

const userStore = create((set) => ({
    users,
}));

export default userStore;
