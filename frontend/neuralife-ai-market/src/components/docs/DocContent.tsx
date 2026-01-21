import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm"; 
import "highlight.js/styles/github-dark.css";
import { useParams } from "react-router-dom";
import { DOCS_SECTIONS } from "./docsData";

export default function DocContent() {
  const { sectionId } = useParams();
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const section =
      DOCS_SECTIONS.find((s) => s.id === sectionId) || DOCS_SECTIONS[0];

    // [!code highlight:8] Check availability immediately
    if (!section.available) {
        setContent(`
# 🚧 Work in Progress

We are currently building this module. The **${section.title}** documentation will be available in the upcoming v1.1 release of the NeuraLife SDK.

Please check back soon!
        `);
        setLoading(false);
        return;
    }

    const filePath = `${import.meta.env.BASE_URL}docs/${section.file}`;

    fetch(filePath)
      .then((res) => {
        if (res.status === 404) {
          // Fallback if file is missing even if marked available
          return "# 🚧 Content Unavailable\n\nThis file seems to be missing.";
        }
        if (!res.ok) {
          throw new Error(`Error loading docs`);
        }
        return res.text();
      })
      .then(setContent)
      .catch((error) => {
        console.error(error);
        setContent(
          "### ⚠️ Connection Error\n\nCould not load documentation."
        );
      })
      .finally(() => setLoading(false));
  }, [sectionId]);

  if (loading) {
    return <div className="flex-1 p-8 animate-pulse">Loading documentation...</div>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10 max-w-4xl mx-auto">
      <article className="prose prose-sm md:prose-lg prose-blue max-w-none">
        <ReactMarkdown 
            rehypePlugins={[rehypeHighlight]} 
            remarkPlugins={[remarkGfm]}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}