/** @type {import('next').NextConfig} */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res-5.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "res-2.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "res-4.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },

    sassOptions: {
        includePaths: [join(__dirname, "styles")],
        prependData: `
      @use "@/styles/vars.scss";
      @use "@/styles/mixins.scss";
    `,
    },
};

export default nextConfig;
