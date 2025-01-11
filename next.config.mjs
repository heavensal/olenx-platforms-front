/** @type {import('next').NextConfig} */
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
    sassOptions: {
        includePaths: [join(__dirname, "styles")],
        prependData: `
      @use "@/styles/vars.scss";
      @use "@/styles/mixins.scss";
    `,
    },
};

export default nextConfig;
