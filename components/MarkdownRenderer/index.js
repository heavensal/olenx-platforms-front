// components/MarkdownRenderer.js
"use client";
import { useState, useEffect } from "react";
import markdownToHtml from "@/utils/markdownToHtml";

const MarkdownRenderer = ({ markdownContent }) => {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        const convertMarkdown = async () => {
            const html = await markdownToHtml(markdownContent);
            setHtmlContent(html);
        };
        convertMarkdown();
    }, [markdownContent]);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: htmlContent,
            }}
        />
    );
};

export default MarkdownRenderer;
